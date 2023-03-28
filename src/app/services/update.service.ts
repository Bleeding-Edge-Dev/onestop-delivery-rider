import { ViewportScroller } from "@angular/common";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AlertController, Platform } from "@ionic/angular";
import { AppUpdate } from "../shared/extra";
import { Plugins } from "@capacitor/core";

const { NativeMarket } = Plugins;
@Injectable({
  providedIn: "root",
})
export class UpdateService {
  jsonUrl = "https://onestopdelivery.in/app/apk/rider_app_update.php";
  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    private iab: InAppBrowser,
    private plt: Platform,
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }
  async checkForUpdates() {
    console.log(
      "updating============================================================================================================================="
    );
    this.http.get(this.jsonUrl).subscribe(async (info: AppUpdate) => {
      const serverVersion = info.current.split(".");
      //alert(JSON.stringify(serverVersion));
      const versionNumber = await this.appVersion.getVersionNumber();
      //alert(JSON.stringify(versionNumber));
      console.log(
        "------------------------------------------------------------------------------------------------------------------------------",
        versionNumber
      );
      const splittedVersion = versionNumber.split(".");

      if (
        splittedVersion[0] < serverVersion[0] ||
        splittedVersion[1] < serverVersion[1]
      ) {
        this.presentAlert(info.msg.title, info.msg.msg, info.major);
      }
    });
  }
  openAppStoreEntry() {
    if (this.plt.is("android")) {
      NativeMarket.openStoreListing({
        appId: "com.onestopdelivery.rider",
      });
    } else {
      this.iab.create("app-link", "_blank");
    }
  }
  async presentAlert(header, message, major) {
    const buttons: any = [
      {
        text: "Update",
        handler: () => {
          this.openAppStoreEntry();
        },
      },
    ];
    if (!major) {
      buttons.push({
        text: "Close",
        role: "cancel",
      });
    }

    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
      backdropDismiss: !major,
    });
    await alert.present();
  }
}
