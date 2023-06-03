import { Component, OnInit } from "@angular/core";
import { get } from "../services/storage";
import { RewardService } from "../services/reward.service";
import { DatePipe } from "@angular/common";
import { IRiderReport } from "../shared/IRiderReport";

@Component({
  selector: "app-payouts",
  templateUrl: "./payouts.page.html",
  styleUrls: ["./payouts.page.scss"],
})
export class PayoutsPage implements OnInit {
  isOrderHistoryOpen: boolean = false;
  selectedValue: string = "daily";
  selectedDate: any = new Date().toISOString();
  todayDate: any = new Date().toISOString();

  constructor(
    private rewardService: RewardService,
    private datePipe: DatePipe
  ) {}
  payoutsData: IRiderReport;

  onSegmentChange() {
    if (this.selectedValue === "daily") {
    } else if (this.selectedValue === "weekly") {
    } else if (this.selectedValue === "monthly") {
    }
    this.onDateChange();
  }
  orderPayHistory = [
    {
      orderId: 1234567,
      amount: 20,
      completedOn: "17 March, 4:23 PM",
    },
    {
      orderId: 1234568,
      amount: 35,
      completedOn: "17 March, 4:23 PM",
    },
  ];
  isMyRewardsOpen: boolean = false;
  MyRewardsHistory = [
    {
      orderId: 1234567,
      amount: 20,
      completedOn: "17 March, 4:23 PM",
    },
  ];

  onDateChange() {
    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      "yyyy/MM/dd"
    );
    this.selectedDate = formattedDate;
    if (this.selectedValue === "daily") {
      this.getPayoutData(this.selectedDate, this.selectedDate);
    } else if (this.selectedValue === "weekly") {
      this.getPayoutData(this.selectedDate, this.calculateEndDate());
    } else if (this.selectedValue === "monthly") {
      const selectedDateObj = new Date(this.selectedDate);
      const firstDate = new Date(
        selectedDateObj.getFullYear(),
        selectedDateObj.getMonth(),
        1
      );
      const lastDate = new Date(
        selectedDateObj.getFullYear(),
        selectedDateObj.getMonth() + 1,
        0
      );
      const formattedFirstDate = this.datePipe.transform(
        firstDate,
        "yyyy/MM/dd"
      );
      const formattedLastDate = this.datePipe.transform(lastDate, "yyyy/MM/dd");
      this.getPayoutData(formattedFirstDate, formattedLastDate);
    }
  }

  calculateEndDate(): string {
    const endDate = new Date(this.selectedDate);
    endDate.setDate(endDate.getDate() + 6);

    if (endDate > this.todayDate) {
      return this.datePipe.transform(this.todayDate, "yyyy/MM/dd");
    }

    return this.datePipe.transform(endDate.toISOString(), "yyyy/MM/dd");
  }

  async ngOnInit() {
    this.getPayoutData(this.selectedDate, this.selectedDate);
  }

  toggleOrderHistory() {
    this.isOrderHistoryOpen = !this.isOrderHistoryOpen;
  }

  toggleMyRewardsHistory() {
    this.isMyRewardsOpen = !this.isMyRewardsOpen;
  }

  async getPayoutData(from, to) {
    let token: String = await get("token");
    token = "Bearer " + token;
    this.rewardService.getPayoutData(token, from, to).subscribe((res: any) => {
      this.payoutsData = res;
    });
  }
}
