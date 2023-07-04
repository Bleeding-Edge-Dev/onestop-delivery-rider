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

  constructor(
    private modalController: ModalController,
    private ordersService: OrdersService,
    private loadingController: LoadingController
  ) {}

  onDismiss(event: any) {
    if (
      event.target.classList.contains('backdrop') ||
      event.target.classList.contains('circle-dismiss-btn')
    ) {
      this.modalController.dismiss();
    }
  }
  onConfirm() {
    this.modalController.dismiss();
    this.approve(this.order.txnid);
  }

  async ngOnInit() {
    this.token = await get('token');
    this.token = 'Bearer ' + this.token;

      const endTime = new Date(this.order.time).getTime() + 5 * 60 * 1000; 
      const currentTime = new Date().getTime();

      this.order.timeLeft = Math.max(0, endTime - currentTime)
  

      this.startCountdown();
  }
  startCountdown() {
    setTimeout(() => {
      if (this.order.timeLeft > 0) {
      this.order.timeLeft -= 1000; 
        this.startCountdown();
      }
      
    }, 1000);
  }
  formatCountdown(countdown: number): string {
    const minutes = Math.floor(countdown / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((countdown % 60000) / 1000); // Convert remaining milliseconds to seconds
  
    // Format the countdown as "mm:ss" or any other desired format
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    } else {
      setTimeout(() => {
        this.sliderValue = 0;
      }, 100);
    }
  }
  getColor() {
    if (this.sliderValue > 90) {
      return '#4FCB6D';
    } else {
      return '#FF6565';
    }
  }
  async approve(id: any) {
    const al = await this.loadingController.create({
      spinner: 'dots',
    });
    await al.present();
    this.ordersService.firstAction(id, 1, this.token).subscribe(async (res) => {
      setTimeout(async () => {
        await al.dismiss({
          role: 'confirm',
        });
      }, 1000);
    });

  }
}
