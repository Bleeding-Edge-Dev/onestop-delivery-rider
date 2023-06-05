import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StatusService } from 'src/app/services/status.service';
import { get } from 'src/app/services/storage';
import { RewardService } from '../services/reward.service';
import { LocationService } from "../services/location.service";


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {



  todayDate: any = new Date().toISOString();

  payoutsData: any = {
    totalEarning: null,
    totalTrips: "0",
    totalHours: "0:0 Hrs",
    earningTransactions: []
  }


  constructor(private navCtrl: NavController,
    private statusService: StatusService,
    private rewardService: RewardService,
    private locationService: LocationService,
    private router: Router) { }
  isRiderOnline: boolean;
  token: any;

  async sendLocation(location) {
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
  myTargetData = { 
    "noOfOrders": [5, 10, 15, 20],
   "rewards": [100, 150, 200, 250], 
   "currentMilestone": { "noOfOrders": 0, "amount": 0 }, 
   "totalOrdersCount": "0" }

  async getRewards() {
    this.rewardService.getReward(this.token).subscribe((res: any) => {
      this.myTargetData = res;
    });
  }
  doRefresh(event) {
    this.getRewards();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  

  async getPayoutData(from, to) {
    let token: String = await get("token");
    token = "Bearer " + token;
    this.rewardService.getPayoutData(token, from, to).subscribe((res: any) => {
      this.payoutsData = res;
    });
  }
}