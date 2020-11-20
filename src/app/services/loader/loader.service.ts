import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;
  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async present(msg) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // spinner: null,
      // message : `<div class='ion-text-center'><img src="assets/loading.gif"  /> <br/> <div class="pt-2" >${msg}</div></div>`,
      message: msg,
      spinner: 'bubbles',
      //  message : `<img src="assets/loading.gif" class="img-align" /> <br/> <div class='ion-text-center'>${msg}</div> `,
        // "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | null | undefined
      // cssClass: 'my-custom-class',   // Write CSS in global.css
      // mode : 'ios',
      duration: 16000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}
