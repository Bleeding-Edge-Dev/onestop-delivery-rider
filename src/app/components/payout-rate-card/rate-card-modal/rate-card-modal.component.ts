import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rate-card-modal',
  templateUrl: './rate-card-modal.component.html',
  styleUrls: ['./rate-card-modal.component.scss'],
})
export class RateCardModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  onDismiss(event: any) {
    if (
      event.target.classList.contains('backdrop') ||
      event.target.classList.contains('circle-dismiss-btn')
    ) {
      this.modalController.dismiss();
    }
  }
  onConfirm() {
    this.modalController.dismiss({
      role: 'confirm',
    });
  }

  ngOnInit() {}
}
