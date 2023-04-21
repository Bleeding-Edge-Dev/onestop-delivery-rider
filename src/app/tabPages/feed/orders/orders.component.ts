import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewOrderModalComponent } from 'src/app/components/new-order-modal/new-order-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
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


  constructor(
    private modalController: ModalController) { }

  async openNewOrder() {
      const modal = await this.modalController.create({
        component: NewOrderModalComponent,
        animated: false,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if(data && data.role === 'confirm') {
        // this.isRiderOnline = true;
      }
  }
  expandOrder(){
    if(this.showActiveOrders){
    }
    else{
      this.openNewOrder();
    }
  }

  ngOnInit(
  ) {  

  }

  showActiveOrders = true;

}
