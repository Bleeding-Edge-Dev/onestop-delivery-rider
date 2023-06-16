import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import {
//   Capacitor,
//   Plugins,
//   PushNotification,
//   PushNotificationToken,
//   PushNotificationActionPerformed,
// } from "@capacitor/core";
// // import { set } from "./storage";
// const { PushNotifications } = Plugins;
// import { FullScreenNotification } from "capacitor-fullscreen-notification";
//const { Device } = Plugins;
import jsSHA from 'jssha';
import { Env } from '../shared/apiConfig';
@Injectable({
  providedIn: 'root',
})
export class FcmService {
  uuid: string = '';
  private apiUrl = Env.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  setId(token: string, id: any) {
    this.getuid();
    let data = {
      token: token,
      id: id,
      uid: this.uuid,
    };
    console.log('Setting firebase' + JSON.stringify(data));
    return this.http.post(this.apiUrl + 'notification.php', data);
  }

  public initPush(token: any) {
    // if (Capacitor.platform !== "web") {
    //   this.registerPush(token);
    // }
  }

  private registerPush(tk: any) {
    // PushNotifications.requestPermission().then((permission) => {
    //   if (permission.granted) {
    //     PushNotifications.register();
    //   } else {
    //     console.log("not registered!!!!!");
    //   }
    // });
    // PushNotifications.createChannel({
    //   description: "Rider Notifications",
    //   id: "fcm_rider_channel",
    //   importance: 5,
    //   lights: true,
    //   name: "Rider Notification Channel",
    //   sound: "osd.mp3",
    //   vibration: true,
    //   visibility: 1,
    // })
    //   .then(() => {
    //     console.log("push channel created: ");
    //   })
    //   .catch((error) => {
    //     console.error("push channel error: ", error);
    //   });
    // PushNotifications.addListener(
    //   "registration",
    //   async (token: PushNotificationToken) => {
    //     await set("fcmToken", token.value);
    //     this.setId(tk, token.value).subscribe((res) =>
    //       console.log("response from api", JSON.stringify(res))
    //     );
    //   }
    // );
    // PushNotifications.addListener(
    //   "pushNotificationActionPerformed",
    //   (notification: PushNotificationActionPerformed) => {
    //     this.router.navigateByUrl("tabs/tabs/tab1");
    //   }
    // );
    // FullScreenNotification.addListener("launch", (data) => {
    //   console.log("...full screen notification", data);
    //   this.router.navigateByUrl("tabs/");
    // });
  }
  async getuid() {
    // const info = await Device.getInfo();
    // let shaObj = new jsSHA("SHA-256", "TEXT");
    // shaObj.update(info.uuid);
    // let h = shaObj.getHash("HEX");
    // await set("uuid", h);
    // this.uuid = h;
    // return h;
  }
}
