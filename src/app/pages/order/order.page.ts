import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { get } from 'src/app/services/storage';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  paymentStatus='pending';
  token;
  orderId;
  order: Order ={
    "id": "",
  "txnid": "",
  "time": "",
  "menu": [],
  "status": "0",
  "vname": "",
  "msg": "",
  "amount": "",
  "ptype": "",
  "vadd": "",
  "address": "",
  "name": "",
  "no": "",
  "longi": "",
  "lati": "",
  "deliveryname": "",
  "deliverynumber": "",
  "riderStatus": 0,
  "prep": undefined,
  "manual": undefined
  }
  foodPrepared: boolean= false;
  allItemsPresent: boolean= false;
  orderInterval;
  statusData = {
    0:{
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
      slideBtnClass:  "disabled-deliver-order"  ,

    }
  }

  sliderValue: number = 0;
  onSliderChange(event: any) {
    const currentValue = event.target.value;
    this.sliderValue = currentValue;

  }
  async onSliderTouchEnd() {
    if (this.sliderValue > 90) {
      switch(parseInt(this.order.status)) {
        case 4:
          this.foodPrepared = true
          this.order.status = '5'
          this.pickedup(this.order.txnid)
          break;
        case 5:
          this.delivered(this.order.txnid)
          break
        default:
          console.log("invalid status")
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
      console.log(res);
      if(res.message === "Link generated successfully"){
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
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.activatedRoute.queryParamMap.subscribe(params => {
      const orderString = params.get('orderId');
      if (orderString) {
        this.orderId = JSON.parse(orderString);
        this.getOrder();

      } else { 
      }
    });

  }

  doRefresh(event) {
    this.getOrder();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  async ionViewDidEnter() {
    this.orderInterval = setInterval(() => {
      this.getOrder();
      if(this.order.ptype==='Cash' ){
        this.checkPaymentStatus();
      }
    }, 3000);
  }

  ionViewDidLeave() {
    clearInterval(this.orderInterval);
  }
  async checkPaymentStatus(){
    this.ordersService.checkPaymentStatus(this.token, this.order.id).subscribe((res: any) => {
      console.log(res);
      
    })
  }
  async getOrder(){
    this.ordersService.getOrder( this.token,this.orderId).subscribe((res: any) => {
      console.log(res);
      let order = res.order;
      order.menu = JSON.parse(order.menu);
      this.order = order;
      if(this.order.ptype!=='Cash' ){
        this.statusData[5].slideBtnClass = "deliver-order"
      }
      console.log(this.order);
      // this.foodPrepared = this.order.prep;
      // this.allItemsPresent = this.order.manual;
    })
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
          this.getOrder();
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
          this.router.navigate(["/tabs/feed"]);
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
}
