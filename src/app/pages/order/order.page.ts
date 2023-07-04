import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { get } from 'src/app/services/storage';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  isLoading: boolean = true;
  paymentStatus = 'pending';
  token = "";
  orderId = "";
  order: any
  foodPrepared: boolean = false;
  allItemsPresent: boolean = false;
  orderInterval: any = null;
  statusData: any = {
    0: {
      headText: "Waiting data",
      vendorCard: false,
      itemsPresentBlock: false,
      slideBtnClass: "reach-restaurant",
    },
    40: {
      headText: "1: Reach Restaurant",
      vendorCard: true,
      itemsPresentBlock: false,
      slideBtnClass: "reach-restaurant",
    },

    4: {
      headText: "2: pickup order",
      vendorCard: true,
      itemsPresentBlock: true,
      slideBtnClass: "disabled-pickup-order",
    },
    5: {
      headText: "3: deliver order",
      vendorCard: false,
      itemsPresentBlock: false,
      slideBtnClass: "deliver-order",

    }
  }

  sliderValue: number = 0;
  onSliderChange(event: any) {
    const currentValue = event.target.value;
    this.sliderValue = currentValue;

  }
  async onSliderTouchEnd() {
    if (this.sliderValue > 90) {
      switch (parseInt(this.order.status)) {
        case 4:

          this.pickedup(this.order.txnid)
          break;
        case 5:
          this.delivered(this.order.txnid)
          break
        default:

      }
    }

    setTimeout(() => {
      this.sliderValue = 0;
    }, 100);

  }
  getColor() {
    if (this.sliderValue > 90) {
      return '#4FCB6D';
    }
    else {
      return '#FF6565';
    }
  }
  async generatePaymentLink() {
    this.ordersService.generatePaymentLink(this.token, this.order.id).subscribe((res: any) => {

      if (res.message === "Link generated successfully") {
        this.paymentStatus = 'waiting'
      }
    })
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  async ngOnInit() {


  }

  doRefresh(event: any) {
    this.getOrder();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }


  async ionViewWillEnter() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.activatedRoute.queryParamMap.subscribe(params => {
      const orderString = params.get('orderId');
      if (orderString) {
        this.orderId = JSON.parse(orderString);
        this.getOrder();


      }
    });

  }

  ionViewDidLeave() {
    clearInterval(this.orderInterval);
  }
  async checkPaymentStatus() {
    this.ordersService.checkPaymentStatus(this.token, this.order.id).subscribe((res: any) => {
      console.log(res);

    })
  }
  async getOrder() {

    const loadingMOdal = await this.loadingController.create({
      spinner: 'lines-small',
      showBackdrop: false,
      animated: false,
    });
    this.isLoading = true;
    await loadingMOdal.present();

    this.ordersService.getOrder(this.token, this.orderId).subscribe((res: any) => {
      console.log(res);
      let order = res.order;
      order.menu = JSON.parse(order.menu);
      this.order = order;
      if (this.order.ptype !== 'Cash') {
        this.statusData[5].slideBtnClass = "deliver-order"
      }
      if (this.order.ptype === 'Cash' && this.order.status === '5') {
        this.checkPaymentStatus();
      }
      console.log(this.order);
      loadingMOdal.dismiss();
      this.isLoading = false;
      // this.foodPrepared = this.order.prep;
      // this.allItemsPresent = this.order.manual;
    })
  }
  async itemsPresent() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Are you sure",
      message: "All items are present?!!!",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.allItemsPresent = true;
            this.statusData[4].slideBtnClass = 'pickup-order'
          },
        },
      ],
    });


    await alert.present();



  }
  async declineorder(id: any) {
    const al = await this.loadingController.create({
      message: "Please Wait..",
      spinner: "bubbles",
    });
    await al.present();
    this.ordersService
      .firstAction(id, 2, this.token)
      .subscribe(async (res: any) => {
        if (res.message == "Success") {

        }
        await al.dismiss();
      });
  }
  async picked(id: any) {
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
          this.getOrder();
          const salert = await this.alertController.create({
            message: "Picked Up!",
            buttons: ["OK"],
          });

          await salert.present();
          this.foodPrepared = true
          this.order.status = '5'
        }
      });
  }
  async deliver(id: any) {
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
          this.router.navigate(["/tabs/feed"]);
          await salert.present();
        }
      });
  }

  async reject(data: any) {
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
  async pickedup(id: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Are you sure",
      message: "Picked up the order?!!!",
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
  async delivered(id: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Good job!",
      message: "Are you sure?!!!",
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
  async rejected(id: any) {
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


  callPhoneNumber(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`, '_system');
  }

  navigateToAddress(vlat:string,vlong:string) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${vlat},${vlong}`, '_system');

  }


}
