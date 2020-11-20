import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.page.html',
  styleUrls: ['./payslip.page.scss'],
})
export class PayslipPage implements OnInit {
  ngGetMonth;
  ngFinancialYear;
  financialYear;

  public getMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  lsEmpDetails: any = [];
  constructor(
    private config: ConfigService,
    private loader: LoaderService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.lsEmpDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
    this.getFinancialYear();
  }

  getFinancialYear() {
    this.loader.present(`Please Wait ...`);
    this.config.getData(`GetFinancialYear`).subscribe(res => {
      if (res.result === 'Success') {
        this.financialYear = res.data.Table;
        console.log(this.financialYear);
        this.loader.dismiss();
      }
      this.loader.dismiss();
    }, error => {
      this.loader.dismiss();
      console.log(error);
    });
  }

  onSubmit() {
    if (this.ngFinancialYear === undefined) {
      this.toast.toastFn(`Choose Finanical Year`);
      return;
    }
    if (this.ngGetMonth === undefined) {
      this.toast.toastFn(`Choose Finanical Year`);
      return;
    }

    this.loader.present(`Please Wait ...`);
    const values = {
        "EmployeeCode": this.lsEmpDetails.Code,
        "FinancialYear": this.ngFinancialYear,
        "Month": this.ngGetMonth
    };
    this.config.postData(`Payslip`, values).subscribe(res => {
      console.log(res);
      if (res.result === 'Success') {
        this.loader.dismiss();
        this.downloadPdf(res.data);
      } else if (res.result === 'Not Success') {
        this.toast.toastFn(`Pay Slip Not Found`, 'middle');
        this.loader.dismiss();
      }
      this.loader.dismiss();
    }, err => {
      console.log(err);
      this.loader.dismiss();
    });

  }

  downloadPdf(url) {
    this.config.downloadPDF(url);
  }




}
