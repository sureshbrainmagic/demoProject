import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateTimeAdapter } from 'ng-pick-datetime';
import * as moment from 'moment'; // add this 1 of 4
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.page.html',
  styleUrls: ['./leaverequest.page.scss'],
})
export class LeaverequestPage implements OnInit {

  ngLeaveFor = 'FullDay';
  dateRange;
  ngFromDate;
  ngToDate;
  ngLeaveType;
  minDate;
  public leaveType = [
    {
      'value': 'CL',
      'type': 'Casual Leave'
    },
    {
      'value': 'CO',
      'type': 'Comp Off'
    },
    {
      'value': 'OPH',
      'type': 'Optional Leave'
    },
    {
      'value': 'EL',
      'type': 'Privilege(Earned) Leave'
    },
    {
      'value': 'SL',
      'type': 'Sick Leave'
    },
    {
      'value': 'ML',
      'type': 'Maternity Leave'
    }
  ];
  noon = [
    {
      'value': 'FN',
      'type': 'Fore Noon'
    },
    {
      'value': 'AN',
      'type': 'After Noon'
    }
  ];
  ngNoon;
  ngNoOfDays;
  ngRemarks;
  ngHalfDayOn;
  lsEmpDetails;
  constructor(
    private datePipe: DatePipe,
    private loader: LoaderService,
    private config: ConfigService,
    private toast: ToastService,
    private router: Router,
    private dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  ngOnInit() {
    this.lsEmpDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
    console.log(this.lsEmpDetails);
    this.dateTimeAdapter.setLocale('en-IN');
    this.minDate = new Date();
  }

  onChange(data) {
    console.log('Triggered', data);
    // this.ngFromDate = moment(this.datePipe.transform(data[0], 'yyyy/MM/dd'));
    // this.ngToDate = moment(this.datePipe.transform(data[1], 'yyyy/MM/dd'));
    this.ngFromDate = moment(this.datePipe.transform(data[0], 'yyyy/MM/dd'));
    this.ngToDate = moment(this.datePipe.transform(data[1], 'yyyy/MM/dd'));
    this.ngNoOfDays = Math.abs(this.ngFromDate.diff(this.ngToDate, 'days'));
  }


  submitFn() {

    if (this.ngLeaveType === undefined || this.ngLeaveType === null) {
      this.toast.toastFn(`Please Choose Leave Type`, 'middle');
      return;
    }

    if (this.ngRemarks === undefined || this.ngRemarks === null) {
      this.toast.toastFn(`Please Enter Remarks`, 'middle');
      return;
    }

    if (this.ngLeaveFor === 'FullDay') {
      this.ngNoon = null;
      this.ngHalfDayOn = null;
      if (this.dateRange === undefined || this.dateRange === null) {
        this.toast.toastFn(`Please Choose From & To Date`, 'middle');
        return;
      }
    } else if (this.ngLeaveFor === 'HalfDay') {

      this.dateRange = null;
      this.ngFromDate = null;
      this.ngToDate = null;

      if (this.ngHalfDayOn === undefined || this.ngHalfDayOn === null) {
        this.toast.toastFn(`Please Choose Half Day On`, 'middle');
        return;
      }
      if (this.ngNoon === undefined || this.ngNoon === null) {
        this.toast.toastFn(`Please Choose Noon`, 'middle');
        return;
      }
    }

    const postValues = {
      "EmpCode": this.lsEmpDetails.Code,
      "FromDate": this.datePipe.transform(this.ngFromDate, 'dd/MM/yyyy'),
      "ToDate": this.datePipe.transform(this.ngToDate, 'dd/MM/yyyy'),
      "LeaveType": this.ngLeaveType,
      "Reason": this.ngRemarks,
      "LeaveMode": this.ngLeaveFor,   // FullDay // HalfDay
      "IsHalfDay": this.ngNoon,   // FN // AN
      "HalfDay": this.ngHalfDayOn
    };

    console.log(JSON.stringify(postValues, null, '\t'));

    this.loader.present(`Applying ...`);
    this.config.postData(`Applyleave`, postValues).subscribe(res => {
      console.log(res);
      const response: any = res;
      if (response.result === 'Success') {
        this.toast.toastFn(`Applied Successfully`);
        this.loader.dismiss();
      } else if (response.result === 'NotSuccess') {
        this.toast.toastFn(`${response.data}`);
        this.loader.dismiss();
      } else if (response.result === 'error') {
        this.toast.toastFn(`Something went wrong !`);
        this.loader.dismiss();
      }
      // this.router.navigate(['home']);
      this.loader.dismiss();
    }, error => {
      this.loader.dismiss();
      console.log(error);
    });


  }


}
