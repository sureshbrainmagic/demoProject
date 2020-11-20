import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { Observable } from 'rxjs';
import { ToastService } from '../toast/toast.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // public rootUrl = 'https://cors-anywhere.herokuapp.com/http://globalbesthr.in/gbhrmobileapp/api/Values/';
  public rootUrl = 'http://globalbesthr.in/gbhrmobileapp/api/Values/';
  constructor(
    private http: HttpClient,
    private downloader: Downloader,
    private toast: ToastService
  ) { }

  getData(url): Observable<any> {
    const geturl = `${this.rootUrl}${url}`;
    return this.http.get(geturl);
  }

  postData(url, formData): Observable<any> {
    const apiURL = `${this.rootUrl}${url}`;
    return this.http.post(apiURL, formData);
  }

  // postData(url, bodyValues): Observable<any> {
  //   const apiURL = `${this.rootUrl}${url}`;
  //   return this.http.post(apiURL, bodyValues);
  // }

  downloadPDF(url) {
    console.log(url);
    const fileType = 'payslip.pdf'; // `${this.transactionID}.pdf`; // url.split('/').pop();
    // // alert(fileType);
    const request: DownloadRequest = {
      uri: url,
      title: fileType,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Download',
        subPath: fileType
      }
    };

    // console.log(request);

    // this.fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + fileType).then(response => {
    //     console.log(response);
    //     // this.dismissLoading();
    // }).catch(err => {
    //     // this.dismissLoading();
    //     console.log(err);
    //   });


    this.downloader.download(request).then((location: string) => {
      // this.toast.toastFn('Pdf Downloaded Successfully:' + location, 'bottom');
      this.toast.toastFn('Pdf Downloaded', 'bottom');
    })
      .catch((error: any) => {
        alert('error' + error);
      });

  }

  
}
