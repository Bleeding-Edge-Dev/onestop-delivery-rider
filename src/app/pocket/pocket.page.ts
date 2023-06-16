import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { DepositModalComponent } from './deposit-modal/deposit-modal.component';
import { get } from '../services/storage';
import { PocketService } from '../services/pocket.service';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.page.html',
  styleUrls: ['./pocket.page.scss'],
})
export class PocketPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private pocketService: PocketService,
    private datePipe: DatePipe
  ) {}
  token: any;
  inHandCash = {
    currentAmount: 300,
    maxAmount: 1000,
  };
  pockedData = {
    inHandAmount: 0,
    maxLimit: 1,
    remainingAmount: 1,
    transaction: [],
  };
  filteredTransactions: any[] = [];
  selectedDate: string = '';

  filterTransactionsByDate() {
    if (!this.selectedDate) {
      this.filteredTransactions = this.pockedData.transaction;
    } else {
      const selectedDateObj = new Date(this.selectedDate);
      this.filteredTransactions = this.pockedData.transaction.filter(
        (trans: any) => {
          const transDate = new Date(trans.datetime);
          return transDate.toDateString() === selectedDateObj.toDateString();
        }
      );
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      animated: false,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.role === 'confirm') {
    }
  }
  ngOnInit() {
    this.getPocketData();
  }
  async getPocketData() {
    this.token = await get('token');
    this.token = 'Bearer ' + this.token;
    this.pocketService.getPocketInfo(this.token).subscribe((res: any) => {
      this.pockedData = res;
    });
  }
}
