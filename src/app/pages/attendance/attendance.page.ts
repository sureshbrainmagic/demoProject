import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  lsEmpDetails: any = [];
  isCheckIn: boolean = false;
  isCheckOut: boolean = true;
  attendanceJson: any = [];
  addressFromGps;
  constructor(
    private alertCtrl: AlertController,
    private config: ConfigService,
    private loader: LoaderService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,

  ) { }

  ionViewWillEnter() {
    this.getPosition();
    this.lsEmpDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
    this.getAttendanceFn(this.lsEmpDetails.Code);
    console.log(localStorage.getItem('checkIn'));
    if (localStorage.getItem('checkIn') === 'true') {
      this.isCheckIn = true;
      this.isCheckOut = false;
    } else {
      this.isCheckIn = false;
      this.isCheckOut = true;
    }
  }

  doRefresh(event) {
    this.getAttendanceFn(this.lsEmpDetails.Code);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }

  async checkInOutAlertFn(mode, msg) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.checkedInOutFn(mode);
            // localStorage.clear();
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  checkedInOutFn(mode) {
    console.log(mode);

    const todayDate = new Date();
    // todayDate.setDate(todayDate.getDate() + 6);
    // console.log(todayDate);

    // const currentDate = this.datePipe.transform(todayDate, 'dd-MM-yyyy');
    const currentDate = this.datePipe.transform(todayDate, 'yyyy-MM-dd');
    const time = this.datePipe.transform(todayDate, 'hh:mm a');
    let values = {};
    // console.log(this.datePipe.transform(todayDate, 'hh:mm a'));

    if (mode === 'checkIn') {
      values = {
        "EmployeeCode": this.lsEmpDetails.Code,
        "Intime": time,
        "PunchDate": currentDate,
        "InAddress": this.addressFromGps,
        "Outtime": "",
        "OutAddress": ""
      };
      this.insertCheckInOut(values, `Checked In at ${time}`, mode);
    } else if (mode === 'checkOut') {
      values = {
        "EmployeeCode": this.lsEmpDetails.Code,
        "Intime": "",
        "PunchDate": currentDate,
        "InAddress": "",
        "Outtime": time,
        "OutAddress": this.addressFromGps
      };
      this.insertCheckInOut(values, `Checked Out at ${time}`, mode);
    }

  }

  insertCheckInOut(values, msg, mode) {
    console.log(values);
    // return;
    this.loader.present(`Please Wait ...`);
    this.config.postData(`Attendance`, values).subscribe(res => {
      console.log(res);
      if (res.result === 'Success') {

        if (mode === 'checkIn') {
          localStorage.setItem('checkIn', 'true');
          localStorage.setItem('checkOut', 'false');
          this.isCheckIn = true;
          this.isCheckOut = false;
        } else if (mode === 'checkOut') {
          localStorage.setItem('checkIn', 'false');
          localStorage.setItem('checkOut', 'true');
          this.isCheckIn = false;
          this.isCheckOut = true;
        }
        this.getAttendanceFn(this.lsEmpDetails.Code);
        this.toast.toastFn(msg);
      } else if (res.result === 'NotSuccess') {
        this.toast.toastFn('You already punched today');
      }
      this.loader.dismiss();
    }, error => {
      this.loader.dismiss();
      console.log(error);
    });
  }


  getAttendanceFn(emplCode) {
    const values = {
      "EmployeeCode": emplCode
    };
    this.loader.present(`Please Wait ...`);
    this.config.postData(`Attendanceview`, values).subscribe(res => {
      console.log(res.data);
      if (res.result === 'Success') {
        this.attendanceJson = res.data;
        this.loader.dismiss();
      }
      this.loader.dismiss();
    }, error => {
      this.loader.dismiss();
      console.log(error);
    });
  }


  getPosition() {
    this.geolocation.getCurrentPosition({
      maximumAge: 10000,
      timeout: 10000,
      // enableHighAccuracy: true
    }).then((resp) => {
      console.log(resp.coords);
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }, er => {
      // alert("error getting location")
      alert('Can not retrieve Location');
    }).catch((error) => {
      console.log(error);
      // alert('Error getting location'+JSON.stringify(error));
      alert('Error getting location - ' + JSON.stringify(error));
    });
  }

  getGeoencoder(latitude, longitude) {
    const geoencoderOptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(latitude, longitude, geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        // console.log(result[0]);
        this.addressFromGps = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  // Return Comma saperated address
  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }


}
