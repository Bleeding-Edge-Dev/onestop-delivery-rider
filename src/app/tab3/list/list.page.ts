import { Component, OnInit } from '@angular/core';
import { get } from 'src/app/services/storage';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  token: any;
  list:any=[];

  constructor(private transaction:TransactionsService) { }

  async ngOnInit() {
    this.token = await get('token');
    this.token ="Bearer "+this.token;
    this.transaction.getList(this.token).subscribe((res) =>{
      this.list = res;
    })
  }

}
