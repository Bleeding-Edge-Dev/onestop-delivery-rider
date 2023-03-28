import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpXhrBackend,
} from "@angular/common/http";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  Device,
  LocalNotificationActionPerformed,
  Modals,
} from "@capacitor/core";
import { Subject } from "rxjs";
import { finalize, map, takeUntil, takeWhile } from "rxjs/operators";
import {
  AlertController,
  LoadingController,
  Platform,
  PopoverController,
} from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { OrdersService } from "../services/orders.service";
import { get, remove } from "../services/storage";
import { Order } from "../shared/order";
import { LogoutComponent } from "./logout/logout.component";
import { MenuPopoverComponent } from "../menu-popover/menu-popover.component";
import { Plugins } from "@capacitor/core";
import { StatusService } from "../services/status.service";

import { FcmService } from "../services/fcm.service";
// Capacitor 2.x
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { LocationService } from "../services/location.service";

const BackgroundGeolocation =
  Plugins.BackgroundGeolocation as BackgroundGeolocationPlugin;
import jsSHA from "jssha";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  name: string;
  token: any;
  ongoingOrders: Order[] = [];
  completedOrders: Order[] = [];
  completeCount = 0;
  ongoingCount = 0;
  ongoingIndexes = [];
  completedIndexes = [];
  pendingOrders = [];
  pendingIndexes = [];
  active: boolean = true;
  updating;
  watcher_id;
  //====timer
  private stop$ = new Subject<any>();
  private value_: number = 0.5;
  private buffer_: number = 0;
  timer$;
  timer: any;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private statusService: StatusService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private platform: Platform,
    private notificationService: FcmService,
    private popoverController: PopoverController,
    private authService: AuthService,
    private locationService: LocationService,
    private http: HttpClient
  ) {
    const watcher_id = BackgroundGeolocation.addWatcher(
      {
        backgroundMessage:
          "Onestop Delivery will track your location to provide you with orders.",
        backgroundTitle: "Tracking You.",
        requestPermissions: true,
        stale: false,
        distanceFilter: 0,
      },
      async function callback(location, error) {
        if (error) {
          if (error.code === "NOT_AUTHORIZED") {
            Modals.confirm({
              title: "Location Required",
              message:
                "This app needs your location, " +
                "but does not have permission.\n\n" +
                "Open settings now?",
            }).then(function ({ value }) {
              console.log("value from modal", value);
              if (value) {
                BackgroundGeolocation.openSettings();
              } else {
                navigator["app"].exitApp();
              }
            });
          }

          return console.error(JSON.stringify(error));
        }
        const httpClient = new HttpClient(
          new HttpXhrBackend({ build: () => new XMLHttpRequest() })
        );
        let token = await get("token");
        token = "Bearer " + token;
        let h = await get("uuid");
        // console.log(JSON.stringify({token,location,key:h}))
        httpClient
          .post(
            "https://onestopdelivery.in/api/riderApp/api/getRiderLocation.php",
            { token, location, key: h }
          )
          .subscribe((res) => {
            console.log("response", res);
          });
        return JSON.stringify(location);
      }
    );
  }
  async sendLocation(location) {
    let t = await get("token");
    t = "Bearer " + t;
    this.locationService
      .setLocation(t, location)
      .subscribe((res) => console.log(res));
  }
  async ngOnInit() {
    const lc = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "dots",
    });
    await lc.present();
    this.name = await get("name");
    this.token = await get("token");
    this.token = "Bearer " + this.token;

    this.notificationService.initPush(this.token);
    //status service
    this.statusService.getStatus(this.token).subscribe((res: any) => {
      if (res.active == "1") {
        this.active = true;
      } else {
        this.active = false;
      }
    });
    //status service end
    this.getAllOrders();
    lc.dismiss();
    this.ordersService
      .getCompletedOrders(this.token)
      .subscribe((res: Order[]) => {
        this.completedOrders = res;
        this.completeCount = res.length;
      });

    //live location==================================================
    //===============================================================
    //console.log("...............................working......................................................")
  }

  keepupdating() {
    this.ordersService.getOngoingOrders(this.token).subscribe((res: any) => {
      res = res.ongoing;
      res.forEach((order) => (order.menu = JSON.parse(order.menu)));
      let currentIndexes = [];
      res.forEach((order, index) => {
        if (Number(order.status) > 3) {
          currentIndexes.push(order.txnid);
          if (!this.ongoingIndexes.includes(order.txnid)) {
            this.ongoingIndexes.push(order.txnid);

            this.ongoingOrders.push(order);
          } else {
            this.ongoingOrders.forEach((o) => {
              if (o.txnid == order.txnid && o.status != order.status) {
                o.status = order.status;
              }
            });
          }
        } else {
          if (!this.pendingIndexes.includes(order.txnid)) {
            this.pendingOrders.push(order);
            this.pendingIndexes.push(order.txnid);
          }
        }
      }); //res loop ends
      this.ongoingIndexes.forEach((id, index) => {
        if (this.pendingIndexes.includes(id)) {
          let index = this.pendingIndexes.indexOf(id);
          this.pendingIndexes.splice(index, 1);
          this.pendingOrders.splice(index, 1);
        }
        console.log(this.ongoingIndexes, currentIndexes);
        if (!currentIndexes.includes(id)) {
          for (let i = 0; i < this.ongoingOrders.length; i++) {
            if (this.ongoingOrders[i].txnid == id) {
              this.ongoingOrders.splice(i, 1);
            }
          }
          this.ongoingIndexes.splice(index, 1);
        }
      });
      this.pendingOrders.forEach((order, index) => {
        let removed = true;
        res.forEach((o) => {
          if (o.txnid == order.txnid) {
            removed = false;
          }
        });
        if (removed) {
          this.pendingOrders.splice(index, 1);
          this.pendingIndexes.splice(index, 1);
        }
      });
      this.ongoingCount = this.ongoingOrders.length;
    });
    //ongoing service ends
    this.ordersService
      .getCompletedOrders(this.token)
      .subscribe((res: Order[]) => {
        this.completedOrders = res;

        if (this.completeCount != res.length) {
          this.completeCount = res.length;
        }
      });
  }

  async approve(id) {
    const al = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "bubbles",
    });
    await al.present();
    this.ordersService.firstAction(id, 1, this.token).subscribe(async (res) => {
      await al.dismiss();
    });
  }
  async declineorder(id) {
    const al = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "bubbles",
    });
    await al.present();
    this.ordersService
      .firstAction(id, 2, this.token)
      .subscribe(async (res: any) => {
        if (res.message == "Success") {
          this.pendingOrders.forEach((order, index) => {
            if (id == order.txnid) {
              this.pendingOrders.splice(index, 1);
            }
          });
        }
        await al.dismiss();
      });
  }
  async picked(id) {
    const al = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "bubbles",
    });
    await al.present();
    this.ordersService
      .firstAction(id, 3, this.token)
      .subscribe(async (res: any) => {
        await al.dismiss();
        if (res.message == "Success") {
          const salert = await this.alertController.create({
            message: "Picked Up!",
            buttons: ["OK"],
          });
          await salert.present();
        }
      });
  }
  async deliver(id) {
    const al = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "bubbles",
    });
    await al.present();
    this.ordersService
      .firstAction(id, 4, this.token)
      .subscribe(async (res: any) => {
        await al.dismiss();
        if (res.message == "Success") {
          const salert = await this.alertController.create({
            message: "Order Delivered!",
            buttons: ["OK"],
          });
          await salert.present();
        }
      });
  }

  async reject(data) {
    let id = data.id;
    let msg = data.rejectmsg;
    const al = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "bubbles",
    });
    await al.present();
    this.ordersService
      .firstAction(id, 5, this.token, msg)
      .subscribe(async (res: any) => {
        await al.dismiss();
        console.log("rejected", res);
        if (res.message == "Success") {
          const salert = await this.alertController.create({
            message: "Order Rejected by Customer!",
            buttons: ["OK"],
          });
          await salert.present();
        }
      });
  }

  async openPopover(order: Order) {
    const pop = await this.popoverController.create({
      component: MenuPopoverComponent,
      componentProps: { order: order },
    });
    await pop.present();
  }

  async openlog($ev) {
    const logPop = await this.popoverController.create({
      component: LogoutComponent,
      event: $ev,
    });
    await logPop.present();
    let rdata: any = await logPop.onWillDismiss();
    if (rdata.data) {
      if (rdata.data.log) {
        await remove("token");
        await this.authService.checkLogin();
        this.router.navigateByUrl("/login");
      }
    }
  }
  //toggle=================================
  async toogleChanged($event) {
    this.statusService
      .setStatus(this.token, $event.detail.checked)
      .subscribe((res: any) => {
        // if(res.message == "done"){
        //   console.log('OK');
        // }else{
        //   console.log('no');
        //}
        console.log(res);
      });
  }

  ionViewDidEnter() {
    this.updating = setInterval(() => {
      this.getAllOrders();
    }, 2000);
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ionViewDidLeave() {
    clearInterval(this.updating);
    clearInterval(this.timer);
  }
  navigateVendor(lat, lng) {
    console.log("clad");
    this.router.navigateByUrl(
      "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng
    );
  }
  updateTime() {
    this.pendingOrders.forEach((order, index) => {
      let ot = new Date(order.allot_time);
      let ct = new Date();
      order.timeLeft = Math.round(
        ot.getTime() / 1000 + 5 * 60 - ct.getTime() / 1000
      );
      if (order.timeLeft <= 0 && order.manual != 1) {
        // console.log('removing',order.txnid);
        this.pendingOrders.splice(index, 1);
      } else {
        this.pendingOrders[index] = order;
      }
    });
  }
  async decline(id) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Confirm!",
      message: "<strong>Do you want to reject this order?</strong>!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            this.declineorder(id);
          },
        },
      ],
    });

    await alert.present();
  }
  async pickedup(id) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Are you sure",
      message: "<strong>Picked up the order?</strong>!!!",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.picked(id);
          },
        },
      ],
    });

    await alert.present();
  }
  async delivered(id) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Good job!",
      message: "<strong>Are you sure?</strong>!!!",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.deliver(id);
          },
        },
      ],
    });

    await alert.present();
  }
  async rejected(id) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Reason for rejection",

      inputs: [
        {
          name: "rejectmsg",
          type: "text",
          placeholder: "",
          cssClass: "rinput",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Submit",
          handler: (rejectmsg) => {
            let data = { ...rejectmsg, id };
            this.reject(data);
          },
        },
      ],
    });

    await alert.present();
  }
  getAllOrders() {
    this.ordersService.getOngoingOrders(this.token).subscribe((res: any) => {
      let pending = res.pending;
      let ongoing = res.ongoing;
      if (!pending) {
        pending = [];
      }
      if (!ongoing) {
        ongoing = [];
      }
      this.pendingOrders.forEach((order, index) => {
        let present = false;
        pending.forEach((o) => {
          if (o.txnid == order.txnid) {
            present = true;
          }
        });
        if (!present) {
          // o.timeLeft = Date.parse(o.time)+(5*60) - Date.now()
          // this.pendingOrders.push(o);
          // console.log('removing',order.txnid)
          this.pendingOrders.splice(index, 1);
        }
      });
      pending.forEach((order: any) => {
        let present = false;
        this.pendingOrders.forEach((o, index) => {
          if (o.txnid == order.txnid) {
            // console.log(order.txnid);
            present = true;
          }
        });

        if (!present) {
          let ot = new Date(order.allot_time);
          let ct = new Date();
          order.timeLeft = Math.round(
            ot.getTime() / 1000 + 5 * 60 - ct.getTime() / 1000
          );
          //console.log('o',( ot.getTime()/1000)+(5*60),'ur',  (ct.getTime()/1000))
          this.pendingOrders.push(order);
          //console.log('push')
        }
      });

      this.ongoingOrders.forEach((order, index) => {
        let present = false;
        console.log(order, ongoing);
        ongoing.forEach((o) => {
          if (o.txnid == order.txnid) {
            present = true;
            console.log("making true", o.txnid, order.txnid);
            this.ongoingOrders[index].status = o.status;
          }
          console.log(present);
        });
        if (present == false) {
          // o.timeLeft = Date.parse(o.time)+(5*60) - Date.now()
          // this.pendingOrders.push(o);
          console.log("not present");
          this.ongoingOrders.splice(index, 1);
        }
      });
      ongoing.forEach((order: any) => {
        let present = false;
        this.ongoingOrders.forEach((o, index) => {
          if (o.txnid == order.txnid) {
            present = true;
            this.ongoingOrders[index].status = o.status;
            this.ongoingOrders[index].prep = o.prep;
          }
        });
        if (!present) {
          order.menu = JSON.parse(order.menu);
          this.ongoingOrders.push(order);
        }
      });
      // console.log(this.pendingOrders);
    });
    this.ordersService
      .getCompletedOrders(this.token)
      .subscribe((res: Order[]) => {
        this.completedOrders = res;

        if (this.completeCount != res.length) {
          this.completeCount = res.length;
        }
      });
  }
}
