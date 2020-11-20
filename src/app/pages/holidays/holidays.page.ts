import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
})
export class HolidaysPage implements OnInit {

  holidayJSON: any = [];
  constructor(
    private config: ConfigService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.getHolidays();
  }

  getHolidays() {

    this.loader.present(`Please Wait ...`);
    this.config.getData(`Holidays`).subscribe(res => {
          console.log(res);
          const response: any = res;
          if (response.result === 'Success') {
            this.holidayJSON = response.data;
          }
          this.loader.dismiss();
        }, error => {
          this.loader.dismiss();
          console.log(error);
        });
  }

}
