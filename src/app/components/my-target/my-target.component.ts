import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-target',
  templateUrl: './my-target.component.html',
  styleUrls: ['./my-target.component.scss'],
})
export class MyTargetComponent implements OnInit {
  @Input() Data : string;

  myTargetData = { 
    "noOfOrders": [5, 10, 15, 20],
   "rewards": [100, 150, 200, 250], 
   "currentMilestone": { "noOfOrders": 5, "amount": 100 }, 
   "totalOrdersCount": "0" }


  
  constructor() { }

  ngOnInit() {
  }

}
