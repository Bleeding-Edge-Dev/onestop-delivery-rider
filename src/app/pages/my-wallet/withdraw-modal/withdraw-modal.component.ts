import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CheckModalComponent } from 'src/app/components/check-modal/check-modal.component';

import { get } from 'src/app/services/storage';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.scss'],
})
export class WithdrawModalComponent implements OnInit {
  token: string = '';
  requestAmount: any;
  reedamableAmount: any;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private walletService: WalletService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.token = await get('token');
    this.walletService.getWalletDetails(this.token).subscribe((data: any) => {
      data.reedamableAmount =
        Math.round(Number(data.reedamableAmount * 100)) / 100;
      this.reedamableAmount = data.reedamableAmount;
    });
  }
  onDismiss(event: any) {
    if (
      event.target.classList.contains('backdrop') ||
      event.target.classList.contains('dismiss-btn')
    ) {
      this.modalController.dismiss();
    }
  }

  async sendRequest() {
    const loadingMOdal = await this.loadingController.create({
      spinner: 'lines-small',
      animated: true,
    });
    await loadingMOdal.present();

    this.modalController.dismiss();
    if(isNaN(this.requestAmount) || this.requestAmount == null || this.requestAmount == undefined || this.requestAmount == 0){
      const toast = await this.toastController.create({
        message: `Please enter valid amount`,
        duration: 2000,

        cssClass: "toast-error",
      });
      loadingMOdal.dismiss();
      toast.present();
    }
    else if (this.requestAmount > this.reedamableAmount) {
      const toast = await this.toastController.create({
        message: `You can't request more than  ₹${this.reedamableAmount}`,
        duration: 2000,

        cssClass: "toast-error",
      });
      loadingMOdal.dismiss();
      toast.present();
    } else {
      const modal = await this.modalController.create({
        component: CheckModalComponent,
        componentProps:{
          type:"success",
          title:"Request Sent",
          message:"Please wait until the administrator approves your request for payment.",
          buttonText:"Okay",
          route: "/tabs/wallet",
        }
      });
      this.walletService
        .sendAmountRequest(this.token, this.requestAmount)
        .subscribe((res: any) => {
          loadingMOdal.dismiss();
          modal.present();
        });
    }
  }
}
