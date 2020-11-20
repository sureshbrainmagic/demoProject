import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() { }

  logoutFn() {
    this.popoverController.dismiss();
    this.router.navigate(['login']);
  }

  goToMyProfileFn() {
    this.popoverController.dismiss();
    this.router.navigate(['myprofile']);
  }

  goToContactUs() {
    this.popoverController.dismiss();
    this.router.navigate(['contactus']);
  }

  goToAboutUs() {
    this.popoverController.dismiss();
    this.router.navigate(['aboutus']);
  }

  async logoutAlertFn() {
    const alert = await this.alertCtrl.create({
      header: 'Logout ?',
      message: 'Do you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Logout',
          handler: () => {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }


}
