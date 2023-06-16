import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {
  order: any;
  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.order = this.navParams.get('order');
    console.log(this.order.menu);
  }
}
