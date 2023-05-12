import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { OrdersService } from 'src/app/services/orders.service';
import { get } from 'src/app/services/storage';

@Component({
  selector: 'app-new-order-modal',
  templateUrl: './new-order-modal.component.html',
  styleUrls: ['./new-order-modal.component.scss'],
})
export class NewOrderModalComponent implements OnInit {

  
  @Input() order: any;
  token: any;

  
  
  constructor(private modalController: ModalController,private ordersService: OrdersService,private loadingController:LoadingController) { }
  
  onDismiss(event: { target: HTMLElement; }) {
    if (event.target.classList.contains('backdrop') || event.target.classList.contains('circle-dismiss-btn')) {
      this.modalController.dismiss();
    }
    
  }
  onConfirm() {
    this.modalController.dismiss();
    this.approve(this.order.txnid)
  }
  
  async ngOnInit() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
  }
  
  sliderValue: number = 0;
  onSliderChange(event: any) {
    const currentValue = event.target.value;
    this.sliderValue = currentValue;
    
    
  }
  onSliderTouchEnd() {
    if (this.sliderValue > 90) {
      this.onConfirm();
      this.sliderValue = 100;
    }
    else{
      setTimeout(() => {
        this.sliderValue = 0;
      }, 100);
    }
  }
  getColor(){
    if(this.sliderValue > 90){
      return '#4FCB6D';
    }
    else{
      return '#FF6565';
    }
  }
  async approve(id) {
    const al = await this.loadingController.create({
      
      spinner: "dots",

    });
    await al.present();
    // this.ordersService.firstAction(id, 1, this.token).subscribe(async (res) => {
      // });
    console.log(id);
      setTimeout(async () => {
          await al.dismiss();
        
    }, 1000);
  }


}
