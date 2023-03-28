import { Component, OnInit } from '@angular/core';
import { get } from 'src/app/services/storage';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-credit-notes',
  templateUrl: './credit-notes.page.html',
  styleUrls: ['./credit-notes.page.scss'],
})
export class CreditNotesPage implements OnInit {
  token;
  transactions = [];
  constructor(private trans: WalletService) {}

  async ngOnInit() {
    this.token = await get('token');
    this.trans.getCreditNotes(this.token).subscribe((res: any) => {
      this.transactions = res;
    });
  }
}
