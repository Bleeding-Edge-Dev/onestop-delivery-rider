import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  orders: any = {
    active: [
      {
        orderId: 123,
        pickupAddress: {
          restaurantName: 'Pizza Palace',
          address: '123 Main St'
        }
      },
      {
        orderId: 456,
        pickupAddress: {
          restaurantName: 'Burger Joint',
          address: '456 Oak Ave'
        }
      }
    ],
    new: [
      {
        orderId: 789,
        pickupAddress: {
          restaurantName: 'Taco Town',
          address: '789 Maple St'
        }
      }
    ]
  };

  showActiveOrders = true;
constructor(){}

  ngOnInit() {
  }

}