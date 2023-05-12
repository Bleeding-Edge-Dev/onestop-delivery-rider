import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  order: any;
  foodPrepared: boolean= false;
  allItemsPresent: boolean= false;

  statusData = {
    4: {
      headText: "1: Reach Restaurant",
      vendorCard: true,
      itemsPresentBlock: false,
      slideBtnClass: "reach-restaurant",
    },

    42: {
      headText: "2: pickup order",
      vendorCard: true,
      itemsPresentBlock: true,
      slideBtnClass: "disabled-pickup-order",
    },
    5: {
      headText: "3: deliver order",
      vendorCard: false,
      itemsPresentBlock: false,
      slideBtnClass: "deliver-order",

    }
  }

  sliderValue: number = 0;
  onSliderChange(event: any) {
    const currentValue = event.target.value;
    this.sliderValue = currentValue;


  }
  onSliderTouchEnd() {
    if (this.sliderValue > 90) {
      switch(parseInt(this.order.status)) {
        case 4:
          this.foodPrepared = true
          this.order.status = 42
          break;
        case 42:
          this.order.status = 5
          break;
        default:
          console.log("invalid status")
      }
    }

      setTimeout(() => {
        this.sliderValue = 0;
      }, 100);

  }
  getColor() {
    if (this.sliderValue > 90) {
      return '#4FCB6D';
    }
    else {
      return '#FF6565';
    }
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.order = history.state.order;
      console.log(this.order);
    });
  }
}