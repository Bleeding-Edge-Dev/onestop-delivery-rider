import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmOnlinePromptComponent } from './confirm-online-prompt/confirm-online-prompt.component';
import { StatusService } from '../../services/status.service';
import { get, remove } from "../../services/storage";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isRiderOnline: boolean = true;
  token: any;
  constructor(
    private modalController: ModalController, private statusService: StatusService) { }


  toggleRiderActiveService(state: boolean) {
    this.statusService
      .setStatus(this.token, state)
      .subscribe((res: any) => {
        if (res.message == "done") {
          this.isRiderOnline = state;
        }
      });
  }
  async toggleRiderOnline() {
    if (this.isRiderOnline) {
      this.toggleRiderActiveService(false)
    } else {
      const modal = await this.modalController.create({
        component: ConfirmOnlinePromptComponent,
        animated: false,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.role === 'confirm') {
        this.toggleRiderActiveService(true)
      }
    }
  }
  ngOnInit() {
    this.getStatus();
  }

  async getStatus() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.statusService.getStatus(this.token).subscribe((res: any) => {
      this.isRiderOnline = res.active == "1" ? true : false;
    });
  }

}



// import { Component, OnInit } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { ConfirmOnlinePromptComponent } from './confirm-online-prompt/confirm-online-prompt.component';
// import { StatusService } from '../services/status.service';
// import { HttpClient, HttpXhrBackend } from '@angular/common/http';
// import { get, remove } from "../services/storage";
// import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
// import {
//   Device,
//   LocalNotificationActionPerformed,
//   Modals,
// } from "@capacitor/core";
// import { Plugins } from "@capacitor/core";

// const BackgroundGeolocation =
//   Plugins.BackgroundGeolocation as BackgroundGeolocationPlugin;
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss'],
// })
// export class HeaderComponent implements OnInit {
//   isRiderOnline: boolean = true;
//   token: any;
//   constructor(
//     private statusService: StatusService,
//     private modalController: ModalController) {
//       async function callback(location, error) {
//         if (error) {
//           if (error.code === "NOT_AUTHORIZED") {
//             Modals.confirm({
//               title: "Location Required",
//               message:
//                 "This app needs your location, " +
//                 "but does not have permission.\n\n" +
//                 "Open settings now?",
//             }).then(function ({ value }) {
//               console.log("value from modal", value);
//               if (value) {
//                 BackgroundGeolocation.openSettings();
//               } else {
//                 navigator["app"].exitApp();
//               }
//             });
//           }

//           return console.error(JSON.stringify(error));
//         }
//         const httpClient = new HttpClient(
//           new HttpXhrBackend({ build: () => new XMLHttpRequest() })
//         );
//         let token = await get("token");
//         token = "Bearer " + token;
//         let h = await get("uuid");
//         // console.log(JSON.stringify({token,location,key:h}))
//         httpClient
//           .post(
//             "https://onestopdelivery.in/api/riderApp/api/getRiderLocation.php",
//             { token, location, key: h }
//           )
//           .subscribe((res) => {
//             console.log("response", res);
//           });
//         return JSON.stringify(location);
//       }
//     }

//   async toggleRiderOnline() {
//     if(this.isRiderOnline) {

//       this.statusService
//       .setStatus(this.token, false)
//       .subscribe((res: any) => {
//         console.log(res);
//       });
//     } else {
//       const modal = await this.modalController.create({
//         component: ConfirmOnlinePromptComponent,
//         animated: false,
//       });
//       await modal.present();
//       const { data } = await modal.onDidDismiss();
//       if(data && data.role === 'confirm') {
//         this.statusService
//         .setStatus(this.token, true)
//         .subscribe((res: any) => {
//           console.log(res);
//         });
//       }
//     }
//   }

//   ngOnInit() {
//     this.statusService.getStatus(this.token).subscribe((res: any) => {
//       if (res.active == "1") {
//         this.isRiderOnline = true;
//       } else {
//         this.isRiderOnline = false;
//       }
//     });
//   }

// }
