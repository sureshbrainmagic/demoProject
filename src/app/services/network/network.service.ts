import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastService } from '../toast/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';
export enum ConnectionStatus {
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private network: Network,
    private toastService: ToastService,
    private plt: Platform,
    private alertCtrl: AlertController
  ) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      const status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {

    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline, '☹️');
        this.exitFunction('Exit and try again', 'Internet is not available ...!');
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online, '☺️');
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.toastService.toastFn('we got a WiFi connection!');
          }
        }, 3000);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus, smiley) {
    this.status.next(status);
    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    this.toastService.toastFn(`You are now ${connection} ${smiley}`);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  async exitFunction(heading, msg: string) {
    const alert = await this.alertCtrl.create({
      header: heading,
      message: msg,
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   handler: () => {

        //   }
        // },
        {
          text: 'Okay',
          handler: () => {
            localStorage.removeItem('lsOffers');
            navigator['app'].exitApp();
            // console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

}
