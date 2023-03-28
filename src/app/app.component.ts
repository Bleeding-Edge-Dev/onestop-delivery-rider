import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Router } from "@angular/router";
import { UpdateService } from "./services/update.service";
//background geolocation tracking

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private router: Router,
    private udpateService: UpdateService // private backgroundGeolocation: BackgroundGeolocation
  ) {
    this.initializeApp();
    //this.startTracking();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.udpateService.checkForUpdates();
      //this.setupPush();
    });
  }
}
