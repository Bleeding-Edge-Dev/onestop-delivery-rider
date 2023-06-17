import { Component, OnInit } from '@angular/core';
import { get } from '../services/storage';
import { RewardService } from '../services/reward.service';
import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { IonDatetime, IonInput } from '@ionic/angular';
import { IRiderReport } from "../shared/IRiderReport";
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
  @ViewChild(IonInput)
  datetimePicker!: IonInput;
  token: string = '';

  openDatePicker() {
    this.datetimePicker.setFocus();
  }

  constructor(private rewardService: RewardService, private datePipe: DatePipe) { }
  payoutsData: IRiderReport | any = null;

  isMyRewardsOpen: boolean = false;

  onSegmentChange() {
    this.payoutsData = null;
    this.selectedDate = new Date().toISOString();
    if (this.selectedValue === 'weekly') {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      this.selectedDate = sixDaysAgo.toISOString();
    }
    this.getData();
  }
  changeWeeklyLabel(val: string) {
    const weeklyStartDate: any = this.datePipe.transform(this.selectedDate, 'MMM d, y', 'en-US');
      const weeklyEndDate: any = this.datePipe.transform(val, 'MMM d, y', 'en-US');
    const element = document.getElementById("weekly-picker");
    console.log(element?.shadowRoot)
    if (element && element.shadowRoot) {
      const targetElement = element.shadowRoot.querySelector("#date-button");
      if (targetElement) {
        targetElement.textContent = weeklyStartDate + " - " + weeklyEndDate;
      }
    }
  }
  


  getCurrentMonth(): string {
    const currentMonth = new Date().toISOString().split('T')[0].substr(0, 7);
    return currentMonth;
  }
  onDateChange(event?: any) {
    this.selectedDate = event.detail.value;
    console.log(this.selectedDate)
    this.getData();
  }
  getData() {
    const formattedDate: any = this.datePipe.transform(
      this.selectedDate,
      'yyyy/MM/dd'
    );
    if (this.selectedValue === 'daily') {
      this.getPayoutData(formattedDate, formattedDate);
    } else if (this.selectedValue === 'weekly') {
      const endDate: any = this.calculateEndDate(formattedDate);
      const formattedEndDate: any = this.datePipe.transform(endDate, 'yyyy/MM/dd');
      
      this.changeWeeklyLabel(formattedEndDate);
      this.getPayoutData(formattedDate, formattedEndDate);
    } else if (this.selectedValue === 'monthly') {
      const selectedDateObj = new Date(formattedDate);
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
      const formattedFirstDate: any = this.datePipe.transform(
        firstDate,
        'yyyy/MM/dd'
      );
      const formattedLastDate: any = this.datePipe.transform(
        lastDate,
        'yyyy/MM/dd'
      );
      this.getPayoutData(formattedFirstDate, formattedLastDate);
    }
  }



  calculateEndDate(selectedDate: any): string | null {
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 6);

    if (endDate > this.todayDate) {
      return this.datePipe.transform(this.todayDate, 'yyyy/MM/dd');
    }

    return this.datePipe.transform(endDate.toISOString(), 'yyyy/MM/dd');
  }








  doRefresh(event: any) {
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }


  async ngOnInit() {
    console.log(this.selectedDate);
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

  async getPayoutData(from: string, to: string) {
    if (this.token) {
      this.rewardService.getPayoutData(this.token, from, to).subscribe((res: any) => {
        this.payoutsData = res;
        if (this.selectedValue === 'weekly') {
          this.changeWeeklyLabel(to);
        }
      });
    }
  }
  myTargetData: any = {
    "noOfOrders": [5, 10, 15, 20],
    "rewards": [100, 150, 200, 250],
    "currentMilestone": { "noOfOrders": 0, "amount": 0 },
    "totalOrdersCount": "0"
  }

  async getRewards() {
    if (this.token) {
      this.rewardService.getReward(this.token).subscribe((res: any) => {
        this.myTargetData = res;
      });
    }
  }

}
