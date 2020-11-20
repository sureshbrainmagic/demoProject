import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async toastFn(msg: string, positionTxt: any = 'bottom', headerString?: string) {
    const toast = await this.toastCtrl.create({
      header: headerString,
      message: msg,
      position: positionTxt,
      duration: 3000,
      cssClass: 'toast-css',
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
