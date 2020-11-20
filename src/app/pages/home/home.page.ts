import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonRouterOutlet, Platform, PopoverController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ConfigService } from 'src/app/services/config/config.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { DatePipe } from '@angular/common';

declare var window;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barChart') barChart;
  @ViewChild('hrzLineChart') hrzLineChart;
  bars: any;
  colorArray: any;
  hrzLines: any;
  count: number = 0;
  emplDOBJSON;
  constructor(
    private popoverController: PopoverController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private alertCtrl: AlertController,
    private router: Router,
    private config: ConfigService,
    private localNotifications: LocalNotifications,
    private datepipe: DatePipe
  ) {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home', true) && this.router.url === '/home') {
        navigator['app'].exitApp();
        // this.exitFunction();
      }
    });

    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   if (!this.routerOutlet.canGoBack()) {
    //     this.exitFunction();
    //   }
    // });
  }

  ngOnInit() {
    window.app.callMethod();
    const lsEmpDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
    console.log(lsEmpDetails);

    // Schedule a single notification
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Today Suresh Birthday',
    //   sound: 'file://sound.mp3',
    //   icon: 'https://www.globalbesthr.com/images/logo1.png'
    // });

    // this.localNotifications.schedule({
    //   title: `Today Suresh's Birthday 🎂🥳🎈🎉`,
    //   text: 'Happy Birthday',
    //   trigger: { at: new Date(new Date().getTime() + 3600) },
    //   led: 'FF0000',
    //   sound: null,
    //   icon: 'https://www.globalbesthr.com/images/logo1.png'
    // });
    this.getBDay();
  }

  goToNotification() {
    if (this.count !== 0) {
      //  this.router.navigateByUrl('/notifications');
      const navigationExtras: NavigationExtras = {
        queryParams: {
          notification: JSON.stringify(this.emplDOBJSON)
        }
      };
      this.router.navigate([`notifications`], navigationExtras);
    }
  }

  getBDay() {

    const today = new Date();
    const currentDateMonth = today.getDate() + '-' + (today.getMonth() + 1);
    console.log(currentDateMonth);
    // console.log(this.datepipe.transform(today, 'dd-mm'));

    this.config.getData(`BirthdayNotification`).subscribe(res => {
      console.log(res.data.Table);
      const emplDB: any = res.data.Table;
      this.emplDOBJSON = res.data.Table;
      emplDB.forEach((element, index) => {
        // console.log(index);
        this.count = index + 1;
        if (element.DOB === currentDateMonth) {
          console.log('ask');
          this.localNotifications.schedule({
            title: `Today Birthday`,
            text: `Happy Birthday ${element.Name} 🎂🥳🎈🎉`,
            // trigger: { at: new Date(new Date().getTime() + 3600) },
            led: 'FF0000',
            sound: null,
            icon: 'https://www.globalbesthr.com/images/logo1.png'
          });
        }
      });
      console.log(this.count);
    }, error => {
      console.log(error);
    });
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      mode: 'ios',
      translucent: true,
      animated: true,
      cssClass: 'popoverClass',
      showBackdrop: true,
      // componentProps: {
      //   aboutUsDetails: this.shopInfo,
      //   shopInfo: this.productInfo,
      //   shopID: this.shopID
      // }

      // cssClass: 'my-custom-class',
    });
    await popover.present();
  }

  ionViewDidEnter() {
    this.createBarChart();
    this.createSimpleLineChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Report',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17, 7.9, 6.9, 8.5, 8],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createSimpleLineChart() {
    this.hrzLines = new Chart(this.hrzLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Last Week',
          data: [20.5, 3.8, 5, 6.9, 6.9, 7.5, 10],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        },
        {
          label: 'This Week',
          data: [5.5, 7.8, 8, 6.9, 7.9, 8.5, 11],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(21, 126, 194)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  async exitFunction() {
    const alert = await this.alertCtrl.create({
      header: 'Exit BEst HRMS App ?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }


}
