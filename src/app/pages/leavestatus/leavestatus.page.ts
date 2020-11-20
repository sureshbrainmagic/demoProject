import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-leavestatus',
  templateUrl: './leavestatus.page.html',
  styleUrls: ['./leavestatus.page.scss'],
})
export class LeavestatusPage implements OnInit {
  ngStatus;
  lsEmpDetails;
  status = [
    {
      'value': 'A',
      'type': 'Approval'
    },
    {
      'value': 'P',
      'type': 'Pending'
    }
  ];
  leaveStatusJSON: any = [];
  constructor(
    private config: ConfigService,
    private loader: LoaderService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.lsEmpDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
  }

  statusFn(mode) {
    if (mode === 'P') {
      return '<b class="text-danger">Pending</b>';
    } else if (mode === 'A') {
      return '<b class="text-success">Approval</b>';
    }
  }

  leaveType(mode) {
    if (mode === 'CL') {
      return 'Casual Leave';
    } else if (mode === 'CO') {
      return 'Comp Off';
    } else if (mode === 'OPH') {
      return 'Optional Leave';
    } else if (mode === 'EL') {
      return 'Privilege(Earned) Leave';
    } else if (mode === 'SL') {
      return 'Sick Leave';
    } else if (mode === 'ML') {
      return 'Maternity Leave';
    } else {
      return mode;
    }
  }

  onSubmitFn() {
    if (this.ngStatus === undefined) {
      this.toast.toastFn(`Please Choose Status`);
      return;
    }
    const values = {
      "LeaveStatus": this.ngStatus,
      "EmpCode": this.lsEmpDetails.Code
    };
    this.loader.present(`Please Wait ...`);
    this.config.postData(`LeaveStatus`, values).subscribe(res => {
      console.log(res);
      const response: any = res;
      if (response.result === 'Success') {
        this.leaveStatusJSON = response.data;
        console.log(this.leaveStatusJSON);
        this.loader.dismiss();
      } else if (response.result === 'NotSuccess') {
        this.leaveStatusJSON = [];
        this.toast.toastFn(`No Data Found`);
        this.loader.dismiss();
      }
      this.loader.dismiss();
    }, error => {
      this.loader.dismiss();
      console.log(error);
    });
  }


}
