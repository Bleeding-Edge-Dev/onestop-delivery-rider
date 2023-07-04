import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { LocationService } from '../services/location.service';
import { IRiderReport } from '../shared/IRiderReport';
import { StatusService } from '../services/status.service';
import { TransactionsService } from '../services/transactions.service';
import { OrdersService } from '../services/orders.service';
import { AuthService } from '../services/auth.service';

import { NewOrderModalComponent } from '../components/new-order-modal/new-order-modal.component';
import { get } from '../services/storage';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  todayDate: any = new Date().toISOString();
  payoutsData: IRiderReport | any = null;
  isRiderOnline: boolean = false;
  token: any;
  isAuthenticated: boolean = false;
  segmentValue = 'active';
  ongoingInterval: any;
  orders: any = { ongoing: [], pending: [] };

  constructor(
    private navCtrl: NavController,
    private statusService: StatusService,
    private transactionService: TransactionsService,
    private locationService: LocationService,
    private router: Router,
    private modalController: ModalController,
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  async sendLocation(location: any) {
    const token = `Bearer ${await get('token')}`;
    this.locationService.setLocation(token, location).subscribe((res) =>
      console.log(res)
    );
  }

  async ngOnInit() {
    this.token = `Bearer ${await get('token')}`;
    
  }

  async ionViewWillEnter() {
    this.getRewards();

    this.statusService.isRiderOnline.subscribe((res) => {
      this.isRiderOnline = res;
    });

    this.getPayoutData(this.todayDate, this.todayDate);

    this.authService.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res;
      if (res) {
        this.getAllOrders();
        this.ongoingInterval = setInterval(() => {
          this.getAllOrders();
        }, 1000);
      } else {
        clearInterval(this.ongoingInterval);
      }
    });
  }

  async ionViewWillLeave() {
    clearInterval(this.ongoingInterval);
  }

  myTargetData: any = {
    noOfOrders: [5, 10, 15, 20],
    rewards: [100, 150, 200, 250],
    currentMilestone: { noOfOrders: 0, amount: 0 },
    totalOrdersCount: '0',
  };

  async getRewards() {
    this.transactionService
      .getRewardInfo(this.token)
      .subscribe((res: any) => {
        this.myTargetData = res;
      });
  }

  doRefresh(event: any) {
    this.getRewards();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async getPayoutData(from: string, to: string) {
    this.transactionService
      .getPayoutData(this.token, from, to)
      .subscribe((res: any) => {
        this.payoutsData = res;
      });
  }

  stepText: any = {
    4: '1: Reach Restaurant',
    42: '2: Pickup Order',
    5: '3: Deliver Order',
  };

  filteredOrders(val: string): any[] {
    const ongoingOrders = this.orders.ongoing;
    const pendingOrders = this.orders.pending;
    const allOrders = ongoingOrders.concat(pendingOrders);
    if (val === 'new') {
      return allOrders.filter((order: any) => parseInt(order.status) <= 3);
    }

    return allOrders.filter((order: any) => parseInt(order.status) > 3);
  }

  async openNewOrder(order: any) {
    const modal = await this.modalController.create({
      component: NewOrderModalComponent,
      animated: false,
      componentProps: {
        order: order,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.role === 'confirm') {
      this.getAllOrders();
    }
  }

  expandOrder(order: any) {
    if (this.segmentValue === 'active') {
      this.router.navigate(['/tabs/order'], {
        queryParams: { orderId: JSON.stringify(order.id) },
      });
    } else {
      this.openNewOrder(order);
    }
  }

  getAllOrders() {
    this.ordersService.getOngoingOrders(this.token).subscribe((res: any) => {
      let pending = res.pending || [];
      let ongoing = res.ongoing || [];

      this.orders.pending.forEach((order: any, index: number) => {
        let present = pending.some((o: any) => o.txnid === order.txnid);
        if (!present) {
          this.orders.pending.splice(index, 1);
        }
      });

      pending.forEach((order: any) => {
        let present = this.orders.pending.some(
          (o: any) => o.txnid === order.txnid
        );
        if (!present) {
          this.orders.pending.push(order);
          this.openNewOrder(order);
        }
      });

      this.orders.ongoing.forEach((order: any, index: number) => {
        let present = ongoing.some((o: any) => o.txnid === order.txnid);
        if (!present) {
          this.orders.ongoing.splice(index, 1);
        }
      });

      ongoing.forEach((order: any) => {
        let present = this.orders.ongoing.some(
          (o: any) => o.txnid === order.txnid
        );
        if (!present) {
          order.menu = JSON.parse(order.menu);
          this.orders.ongoing.push(order);
        }
      });
    });
  }
}
