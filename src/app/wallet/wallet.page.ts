import { Component, OnInit } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";

import { get } from "../services/storage";
import { WalletService } from "../services/wallet.service";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.page.html",
  styleUrls: ["./wallet.page.scss"],
})
export class WalletPage implements OnInit {
  token;
  details;
  requestAmount;
  date;
  constructor(
    private walletService: WalletService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.token = await get("token");
    this.date = this.getRedeemDate();
    this.walletService.getWalletDetails(this.token).subscribe((data: any) => {
      data.reedamableAmount =
        Math.round(Number(data.reedamableAmount * 100)) / 100;
      data.balance = Math.round(Number(data.balance * 100)) / 100;
      data.lifetimeEarning =
        Math.round(Number(data.lifetimeEarning * 100)) / 100;
      data.amount_received =
        Math.round(Number(data.amount_received * 100)) / 100;
      data.amount_deducted =
        Math.round(Number(data.amount_deducted * 100)) / 100;

      this.details = data;
    });
  }
  async sendRequest() {
    if (isNaN(this.requestAmount)) {
      const toast = await this.toastController.create({
        message: "Invalid Amount.",
        duration: 2000,
        position: "top",
      });
      toast.present();
    } else if (this.requestAmount > this.details.reedamableAmount) {
      const toast = await this.toastController.create({
        message: "Invalid Amount.",
        duration: 2000,
        position: "top",
      });
    } else {
      this.walletService
        .sendAmountRequest(this.token, this.requestAmount)
        .subscribe((res: any) => {
          this.presentAlertConfirm();
        });
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Request Sent",
      message: "Please wait while admin verifies and settles your request.",
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.ngOnInit();
          },
        },
      ],
    });

    await alert.present();
  }
  getRedeemDate() {
    return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  }
}
