import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-target',
  templateUrl: './my-target.component.html',
  styleUrls: ['./my-target.component.scss'],
})
export class MyTargetComponent implements OnInit {
  targetData = {
    maxReward:1000,
    currentReward: 200,
    ridesPerReward: {
      10:75,
      15:150,
      25:500,
      50:1000
    }
  }

  
  constructor() { }

  ngOnInit() {}

}
