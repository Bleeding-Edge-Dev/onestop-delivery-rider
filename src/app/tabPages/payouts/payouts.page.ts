import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.page.html',
  styleUrls: ['./payouts.page.scss'],
})
export class PayoutsPage implements OnInit {
  isOrderHistoryOpen: boolean = false;
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
  
  constructor() { }

  ngOnInit() {
  }
  toggleOrderHistory() {
    this.isOrderHistoryOpen = !this.isOrderHistoryOpen;
  }
  toggleMyRewardsHistory() {
    this.isMyRewardsOpen = !this.isMyRewardsOpen;
  }
}
