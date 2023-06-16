import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { ReportService } from '../services/report.service';
import { get, remove } from '../services/storage';
import { Order } from '../shared/order';
import { LogoutComponent } from '../tab1/logout/logout.component';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  totalDist = 0;
  totalCash = 0;
  totalOrders = 0;
  cashCount = 0;
  name: string = '';
  token: string = '';
  allOrders: Order[] = [];
  rejectedCount = 0;

  constructor(
    private reportService: ReportService,
    private authService: AuthService,
    private popoverController: PopoverController,
    private router: Router,
    private orderService: OrdersService,
    private loadingController: LoadingController
  ) {}
  async ngOnInit() {
    const lc = await this.loadingController.create({
      message: 'Please wait..',
      spinner: 'dots',
    });
    await lc.present();
    this.token = await get('token');
    this.token = 'Bearer ' + this.token;
    this.name = await get('name');
    this.reportService.getTotals(this.token).subscribe(async (res: any) => {
      if (res) {
        this.totalCash = res.totalCash;
        this.totalDist = res.dist;
        this.totalOrders = res.totalOrders;
        this.cashCount = res.cashCount;
        this.rejectedCount = res.totalRejectedOrders;
      }
      await lc.dismiss();
    });
  }

  async openlog($ev: any) {
    const logPop = await this.popoverController.create({
      component: LogoutComponent,
      event: $ev,
    });
    await logPop.present();
    let rdata: any = await logPop.onWillDismiss();
    if (rdata.data) {
      if (rdata.data.log) {
        await remove('token');
        await this.authService.checkLogin();
        this.router.navigateByUrl('/login');
      }
    }
  }
  async ionViewWillEnter() {
    this.token = await get('token');
    this.token = 'Bearer ' + this.token;
    this.reportService.getTotals(this.token).subscribe((res: any) => {
      if (res) {
        this.totalCash = res.totalCash;
        this.totalDist = res.dist;
        this.totalOrders = res.totalOrders;
        this.cashCount = res.cashCount;
      }
    });
    this.orderService.getCompletedOrders(this.token).subscribe((res: any) => {
      if (res) {
        res.forEach((order: any) => (order.menu = JSON.parse(order.menu)));
        this.allOrders = res;
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
}
