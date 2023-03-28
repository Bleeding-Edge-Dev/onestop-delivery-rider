import { Component, OnInit } from '@angular/core';
import { get } from 'src/app/services/storage';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  token: any;
  report:any=[];

  constructor(private transaction:TransactionsService) { }

  async ngOnInit() {
    this.token = await get('token');
    this.token ="Bearer "+this.token;
    this.transaction.getRewardReport(this.token).subscribe((res) =>{
      this.report = res;
    })
  }
}
