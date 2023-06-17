import { Component, OnInit } from '@angular/core';
import { get } from '../services/storage';
import { RewardService } from '../services/reward.service';
import { DatePipe } from '@angular/common';
import { IRiderReport } from "../shared/IRiderReport";
import { LoadingController } from '@ionic/angular';
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
  token: string = '';

  constructor(private rewardService: RewardService, private datePipe: DatePipe,
private loadingController: LoadingController
    ) { }
  payoutsData: IRiderReport | any = null;

  isMyRewardsOpen: boolean = false;
  isLoading: boolean = false;

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
  changePickerLabel(val?: string) {
    let weeklyStartDate: any = this.datePipe.transform(this.selectedDate, 'MMM d, y', 'en-US');
    if (this.selectedValue === 'monthly') {
      weeklyStartDate = this.datePipe.transform(this.selectedDate, 'MMMM y ', 'en-US');
    }

      const weeklyEndDate: any = this.datePipe.transform(val, 'MMM d, y', 'en-US');
    const element = document.getElementById("date-picker");

    if (element && element.shadowRoot) {
      const targetElement = element.shadowRoot.querySelector("#date-button");
      if (targetElement) {
        targetElement.textContent = weeklyEndDate? (weeklyStartDate + " - " + weeklyEndDate) : (weeklyStartDate);
      }
    }
  }
  


  getCurrentMonth(): string {
    const currentMonth = new Date().toISOString().split('T')[0].substr(0, 7);
    return currentMonth;
  }
  onDateChange(event?: any) {
    this.selectedDate = event.detail.value;

    this.getData();
  }
  getData() {
    const formattedDate: any = this.datePipe.transform(
      this.selectedDate,
      'yyyy/MM/dd'
    );
    if (this.selectedValue === 'daily') {
      this.getPayoutData(formattedDate, formattedDate);
      this.changePickerLabel();
    } else if (this.selectedValue === 'weekly') {
      const endDate: any = this.calculateEndDate(formattedDate);
      const formattedEndDate: any = this.datePipe.transform(endDate, 'yyyy/MM/dd');
      
      this.changePickerLabel(formattedEndDate);
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
      this.changePickerLabel();
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

    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.getData();
  }

  toggleOrderHistory() {
    this.isOrderHistoryOpen = !this.isOrderHistoryOpen;
  }

  toggleMyRewardsHistory() {
    this.isMyRewardsOpen = !this.isMyRewardsOpen;
  }

  async getPayoutData(from: string, to: string) {
    if (this.token) {
      const loadingMOdal = await this.loadingController.create({
        spinner: 'lines-small',
        showBackdrop: false,
        animated: false,
      });
      this.isLoading = true;
      await loadingMOdal.present();
      this.rewardService.getPayoutData(this.token, from, to).subscribe((res: any) => {
        this.payoutsData = res;
        this.isLoading = false;
        loadingMOdal.dismiss();
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
