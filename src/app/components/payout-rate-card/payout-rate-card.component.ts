import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RateCardModalComponent } from './rate-card-modal/rate-card-modal.component';

@Component({
  selector: 'app-payout-rate-card',
  templateUrl: './payout-rate-card.component.html',
  styleUrls: ['./payout-rate-card.component.scss'],
})
export class PayoutRateCardComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: RateCardModalComponent,
    });
    return await modal.present();
  }

}
