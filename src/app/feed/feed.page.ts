import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StatusService } from 'src/app/services/status.service';
import { get } from 'src/app/services/storage';
import { RewardService } from '../services/reward.service';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(private navCtrl: NavController,
    private statusService: StatusService,
    private rewardService: RewardService,
    private router: Router) { }
  isRiderOnline: boolean = true;
  token: any;


  async ngOnInit() {
    this.getStatus();
    this.getRewards();

  }
  async getStatus() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    const statusInterval = setInterval(() => {
      if (this.router.url != '/tabs/tabs/feed') {
        clearInterval(statusInterval);
      }
      this.statusService.getStatus(this.token).subscribe((res: any) => {
        this.isRiderOnline = res.active == "1" ? true : false;
      });
    }, 200);
  }
  myTargetData = { 
    "noOfOrders": [5, 10, 15, 20],
   "rewards": [100, 150, 200, 250], 
   "currentMilestone": { "noOfOrders": 5, "amount": 100 }, 
   "totalOrdersCount": "0" }

  async getRewards() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.rewardService.getReward(this.token).subscribe((res: any) => {
      console.log(res);
    });
  }



  goTo(here: string) {
    switch (here) {
      case 'payouts':
        this.navCtrl.navigateForward('/tabs/tabs/payouts');
        break;
      case 'trips':
        this.router.navigate(['/trip-history']);
        break;
      case 'sessions':
        break
      default:
        break;
    }
  }
}