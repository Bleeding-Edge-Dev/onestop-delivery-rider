import { Component, OnInit } from '@angular/core';
import { get } from 'src/app/services/storage';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {
  transactions: any[] = [];
  token: any;
  constructor(private trans: WalletService) {}

  async ngOnInit() {
    this.token = await get('token');
    this.trans.getPendingTransactions(this.token).subscribe((res: any) => {
      this.transactions = res;
    });
  }
}
