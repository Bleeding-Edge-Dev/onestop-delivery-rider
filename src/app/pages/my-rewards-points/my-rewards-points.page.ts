import { Component, OnInit } from '@angular/core';
import { RewardService } from 'src/app/services/reward.service';
import { get } from 'src/app/services/storage';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-my-rewards-points',
  templateUrl: './my-rewards-points.page.html',
  styleUrls: ['./my-rewards-points.page.scss'],
})
export class MyRewardsPointsPage implements OnInit {
  token;
  rewardsHistory;

  constructor(
    private transactionService: TransactionsService,
    private rewardService: RewardService

  ) { }

  async ngOnInit() {
    this.token = "Bearer " + await  get("token");
    this.getRewardsHistory();
  }
  getRewardsHistory() {
      if(this.token){
        this.rewardService.getReward(this.token).subscribe((res: any) => {
            console.log(res);
        })

        this.transactionService.getRewardInfo(this.token).subscribe((res: any) => {

          this.rewardsHistory = res;
        })
      }
  }

}
