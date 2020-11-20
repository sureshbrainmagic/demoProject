import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GpspermissionService {
  public strLat;
  public strLong;
  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    // private nativeGeocoder: NativeGeocoder,
  ) { }


  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  // getAddress(lat, long): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const options: NativeGeocoderOptions = {
  //       useLocale: true,
  //       maxResults: 5
  //     };
  //     this.nativeGeocoder.reverseGeocode(lat, long, options).then((result: NativeGeocoderResult[]) => {
  //       resolve(result[0]);
  //     },
  //       err => {
  //         reject(err);
  //       });
  //   });

  // }



  generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }



  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        // alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              this.enableGpsAlertFn();
              // alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
      },
      error => {
        this.enableGpsAlertFn();
        // this.checkGPSPermission();
        // alert('Error requesting location permissions ' + JSON.stringify(error));
      }
    );
  }

  async exitFunction(msg: string) {
    const alert = await this.alertCtrl.create({
      header: msg,
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
            navigator['app'].exitApp();
            // console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

  async enableGpsAlertFn() {
    const alert = await this.alertCtrl.create({
      header: `Please Enable Your GPS...`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            // this.checkGPSPermission();
            navigator['app'].exitApp();
          }
        },
        {
          text: 'YES',
          handler: () => {
            // navigator['app'].exitApp();
            this.checkGPSPermission();
          }
        }
      ]

    });

    await alert.present();
  }

}
