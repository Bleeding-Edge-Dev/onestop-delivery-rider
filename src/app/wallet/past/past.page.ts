import { Component, OnInit } from '@angular/core';
import { get } from 'src/app/services/storage';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.page.html',
  styleUrls: ['./past.page.scss'],
})
export class PastPage implements OnInit {
  transactions = [];
  token;
  constructor(private trans: WalletService) {}

  async ngOnInit() {
    this.token = await get('token');
    this.trans.getAllTransactions(this.token).subscribe((res: any) => {
      this.transactions = res;
    });
  }
}
