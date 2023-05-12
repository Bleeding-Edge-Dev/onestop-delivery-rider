import { Component, OnInit } from '@angular/core';
import { get } from '../services/storage';
import { RewardService } from '../services/reward.service';
import { DatePipe } from '@angular/common';

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

  constructor(private rewardService: RewardService, private datePipe: DatePipe) { }
  payoutsData: any = {
    totalEarning: null,
    totalTrips: "0",
    totalHours: "0:0 Hrs",
    earningTransactions: []
  }

  onSegmentChange() {
    if (this.selectedValue === 'daily') {
    } else if (this.selectedValue === 'weekly') {
    } else if (this.selectedValue === 'monthly') {
      // this.selectedDate = new Date().toISOString()
    }
  }
  orderPayHistory = [
    {
      orderId: 1234567,
      amount: 20,
      completedOn: '17 March, 4:23 PM'
    },
    {
      orderId: 1234568,
      amount: 35,
      completedOn: '17 March, 4:23 PM'
    },
  ];
  isMyRewardsOpen: boolean = false;
  MyRewardsHistory = [
    {
      orderId: 1234567,
      amount: 20,
      completedOn: '17 March, 4:23 PM'
    },


  ];


  onDateChange() {

    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy/MM/dd');
    console.log(formattedDate);
    this.selectedDate = formattedDate;


    if (this.selectedValue === 'daily') {
      this.getPayoutData(this.selectedDate, this.selectedDate)
    } else if (this.selectedValue === 'weekly') {
      this.getPayoutData(this.selectedDate, this.calculateEndDate())
    } else if (this.selectedValue === 'monthly') {

    }
  }


  calculateEndDate(): string {
    const endDate = new Date(this.selectedDate);
    endDate.setDate(endDate.getDate() + 7); // Add 6 days to get the end date

    // Check if the end date is greater than today's date

    if (endDate > this.todayDate) {
      return this.datePipe.transform(this.todayDate, 'yyyy/MM/dd');;; // Return today's date if it exceeds today's date
    }

    return this.datePipe.transform(endDate.toISOString(), 'yyyy/MM/dd');;
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
