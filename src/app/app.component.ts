import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
// import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Router } from '@angular/router';
import { UpdateService } from './services/update.service';
//background geolocation tracking

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private udpateService: UpdateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await SplashScreen.hide();

      this.udpateService.checkForUpdates();
    });
  }
}
