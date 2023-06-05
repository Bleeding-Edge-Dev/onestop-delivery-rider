import { Component, OnInit } from '@angular/core';
import { get } from '../services/storage';
import { RewardService } from '../services/reward.service';
import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.page.html',
  styleUrls: ['./payouts.page.scss'],
})
export class PayoutsPage implements OnInit {
  isOrderHistoryOpen: boolean = false;
  selectedValue: string = "daily";
  selectedDate: any = new Date().toISOString();
  todayDate: any = new Date().toISOString();
  @ViewChild(IonDatetime) datetimePicker: IonDatetime;
  token;

  openDatePicker() {
    this.datetimePicker.open();
  }

  constructor(private rewardService: RewardService, private datePipe: DatePipe) { }
  payoutsData: any = {
    totalEarning: null,
    totalTrips: "0",
    totalHours: "0:0 Hrs",
    earningTransactions: [],
    orderPay: '',
    rewardTransactions: [],
    rewards: 0
  }

  isMyRewardsOpen: boolean = false;

  onSegmentChange() {
    this.payoutsData = {
      totalEarning: null,
      totalTrips: "0",
      totalHours: "0:0 Hrs",
      earningTransactions: []
    }
    this.selectedDate = new Date().toISOString();
    if (this.selectedValue === 'weekly') {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      this.selectedDate = sixDaysAgo.toISOString();
    }
    this.onDateChange();
  }
  getCurrentDate(): string {
    return this.todayDate;
  }

  getCurrentMonth(): string {
    const currentMonth = new Date().toISOString().split('T')[0].substr(0, 7);
    return currentMonth;
  }
  onDateChange() {

    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'yyyy/MM/dd'
    );
    this.selectedDate = formattedDate;
    if (this.selectedValue === 'daily') {
      this.getPayoutData(this.selectedDate, this.selectedDate);
    } else if (this.selectedValue === 'weekly') {
      const endDate = this.calculateEndDate(this.selectedDate);
      const formattedEndDate = this.datePipe.transform(endDate, 'yyyy/MM/dd');
      this.getPayoutData(this.selectedDate, formattedEndDate);
    } else if (this.selectedValue === 'monthly') {
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
        'yyyy/MM/dd'
      );
      const formattedLastDate = this.datePipe.transform(
        lastDate,
        'yyyy/MM/dd'
      );
      this.getPayoutData(formattedFirstDate, formattedLastDate);
    }
  }




  calculateEndDate(selectedDate: any): string {
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 6);

    if (endDate > this.todayDate) {
      return this.datePipe.transform(this.todayDate, 'yyyy/MM/dd');
    }

    return this.datePipe.transform(endDate.toISOString(), 'yyyy/MM/dd');
  }








  doRefresh(event) {
    this.onSegmentChange();
    setTimeout(() => {
      event.target.complete();
    },500);
  }


  async ngOnInit() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.getPayoutData(this.selectedDate, this.selectedDate);
  }

  toggleOrderHistory() {
    this.isOrderHistoryOpen = !this.isOrderHistoryOpen;
  }

  toggleMyRewardsHistory() {
    this.isMyRewardsOpen = !this.isMyRewardsOpen;
  }

  async getPayoutData(from, to) {
    this.rewardService.getPayoutData(this.token, from, to).subscribe((res: any) => {
      console.log(res)
      this.payoutsData = res;
    });
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

}
