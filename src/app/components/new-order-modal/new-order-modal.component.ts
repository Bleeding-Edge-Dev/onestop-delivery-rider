import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-order-modal',
  templateUrl: './new-order-modal.component.html',
  styleUrls: ['./new-order-modal.component.scss'],
})
export class NewOrderModalComponent implements OnInit {

  sliderValue: number = 0;




  constructor(private modalController: ModalController) { }

  onDismiss(event: { target: HTMLElement; }) {
    if (event.target.classList.contains('backdrop') || event.target.classList.contains('dismiss-btn')) {
      this.modalController.dismiss();
    }

  }
  onConfirm() {
    this.modalController.dismiss({
      role: 'confirm'
    });
  }


  ngOnInit() {}

  onSliderChange(event: any) {
    const currentValue = event.target.value;
    console.log(currentValue);
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


}
