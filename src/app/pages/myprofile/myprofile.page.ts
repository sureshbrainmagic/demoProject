import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  type: string;
  lsEmpDetails;
  constructor() { }

  ngOnInit() {
    this.type = 'Overview';
    this.lsEmpDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
    console.log(this.lsEmpDetails);
    // console.log(JSON.stringify(this.lsEmpDetails, null, '\t'));
  }

  segmentChanged(event) {
    console.log(event.detail.value);
  }

}
