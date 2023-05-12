import { Component, OnInit } from '@angular/core';
import { get } from 'src/app/services/storage';
import { WalletService } from 'src/app/services/wallet.service';
import { WithdrawModalComponent } from './withdraw-modal/withdraw-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {
  token;

  data={
    balance:0,
  };
  selectedTransaction = "past";
  pastTransactions = [];
  pendingTransactions = [];
  creditTransactions = [];
  constructor(
    private walletService: WalletService,
    private modalController: ModalController

  ) { }
  filteredTransaction(){
    if(this.selectedTransaction == "past"){
      return this.pastTransactions;
    }else if(this.selectedTransaction == "pending"){
      return this.pendingTransactions;
    }else{
      return this.creditTransactions;
    }
  }
  async ngOnInit() {
    this.token = await get("token");
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
      this.data = data;
    });
    this.walletService.getAllTransactions(this.token).subscribe((res: any) => {
      this.pastTransactions = res;
    });
    this.walletService.getPendingTransactions(this.token).subscribe((res: any) => {
      this.pendingTransactions = res;
      console.log(res)
    });
    this.walletService.getCreditNotes(this.token).subscribe((res: any) => {
      this.creditTransactions = res;
    });
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: WithdrawModalComponent,
      animated: false,
    });
    await modal.present();
}
}
