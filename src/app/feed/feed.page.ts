import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StatusService } from 'src/app/services/status.service';
import { get } from 'src/app/services/storage';

import { LocationService } from "../services/location.service";
import { IRiderReport } from "../shared/IRiderReport";
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  todayDate: any = new Date().toISOString();

  payoutsData: IRiderReport | any = null; 


  constructor(private navCtrl: NavController,
    private statusService: StatusService,
    private transactionService: TransactionsService,
    private locationService: LocationService,
    private router: Router) { }
  isRiderOnline: boolean = false;
  token: any;

  async sendLocation(location:any) {
    let t = await get("token");
    t = "Bearer " + t;
    this.locationService
      .setLocation(t, location)
      .subscribe((res) => console.log(res));
  }
  async ngOnInit() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.getRewards();
    this.statusService.isRiderOnline.subscribe((res) => {
      this.isRiderOnline = res;
    })
    this.getPayoutData(this.todayDate, this.todayDate);
  }
  myTargetData:any = { 
    "noOfOrders": [5, 10, 15, 20],
   "rewards": [100, 150, 200, 250], 
   "currentMilestone": { "noOfOrders": 0, "amount": 0 }, 
   "totalOrdersCount": "0" }

  async getRewards() {
    this.transactionService.getRewardInfo(this.token).subscribe((res: any) => {
      this.myTargetData = res;
    });
  }
  doRefresh(event:any) {
    this.getRewards();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async getPayoutData(from:string, to:string) {
    this.transactionService.getPayoutData(this.token, from, to).subscribe((res: any) => {
      this.payoutsData = res;
    });
  }
}