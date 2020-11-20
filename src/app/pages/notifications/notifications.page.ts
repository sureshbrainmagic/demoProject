import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notificationJSON: any = [];
  getYear;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const today = new Date();
    this.getYear = today.getFullYear();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.notification) {
        console.log(JSON.parse(params.notification));
        this.notificationJSON = JSON.parse(params.notification);
      }
    });
  }

}
