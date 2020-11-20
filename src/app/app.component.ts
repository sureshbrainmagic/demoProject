import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GpspermissionService } from './services/gpspermission/gpspermission.service';
import { ToastService } from './services/toast/toast.service';
import { ConnectionStatus, NetworkService } from './services/network/network.service';
declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public lsEmplDetails: any = [];
  isRemainder;
  isPayRoll;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private gps: GpspermissionService,
    private networkService: NetworkService,
    private toastService: ToastService,
  ) {
    this.initializeApp();
    window.app = this;
  }

  callMethod() {
    if (localStorage.getItem('lsEmployeeDetails') != null) {
      this.lsEmplDetails = JSON.parse(localStorage.getItem('lsEmployeeDetails'));
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.gps.checkGPSPermission();
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status === ConnectionStatus.Offline) {
          this.toastService.toastFn(`Internet is not available  ☹️`);
          setTimeout(() => {
            this.networkService.exitFunction('Exit and try again', 'Internet is not available ...!');
          }, 2000);
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}