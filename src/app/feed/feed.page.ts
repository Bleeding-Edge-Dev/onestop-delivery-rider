import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { StatusService } from "src/app/services/status.service";
import { get } from "src/app/services/storage";
import { RewardService } from "../services/reward.service";
import { ReportService } from "../services/report.service";
import { IRiderReport } from "../shared/IRiderReport";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.page.html",
  styleUrls: ["./feed.page.scss"],
})
export class FeedPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private statusService: StatusService,
    private rewardService: RewardService,
    private router: Router
  ) {}
  isRiderOnline: boolean = true;
  token: any;
  myTargetData = {
    noOfOrders: [],
    rewards: [],
    currentMilestone: { noOfOrders: 0, amount: 0 },
    totalOrdersCount: "0",
  };
  report: IRiderReport;
  async ngOnInit() {
    this.getStatus();
    this.getRewards();
    this.getReport();
  }
  async getReport() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.rewardService
      .getPayoutData(
        this.token,
        new Date().toISOString(),
        new Date().toISOString()
      )
      .subscribe((res: any) => {
        this.report = res;
        console.log(this.report);
      });
  }
  async getStatus() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    const statusInterval = setInterval(() => {
      if (this.router.url != "/tabs/tabs/feed") {
        clearInterval(statusInterval);
      }
      this.statusService.getStatus(this.token).subscribe((res: any) => {
        this.isRiderOnline = res.active == "1" ? true : false;
      });
    }, 200);
  }

  async getRewards() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.rewardService.getReward(this.token).subscribe((res: any) => {
      this.myTargetData = res;
    });
  }

  goTo(here: string) {
    switch (here) {
      case "payouts":
        this.navCtrl.navigateForward("/tabs/tabs/payouts");
        break;
      case "trips":
        this.router.navigate(["/tabs/trip-history"]);
        break;
      case "sessions":
        break;
      default:
        break;
    }
  }
}
