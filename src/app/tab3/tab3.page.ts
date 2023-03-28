import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { get } from '../services/storage';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  token: any;
  info: any;
  request_points;
  constructor(private transaction:TransactionsService,private toastController:ToastController) {}
  async ngOnInit(){
    this.token = await get('token');
    this.token ="Bearer "+this.token;
    this.transaction.getRewardInfo(this.token).subscribe((res)=>{
      this.info = res;
    })
  }

 async presentToast(msg){
   this.toastController.create({message:msg,duration:2000}).then(toast=>toast.present());
  }
  request(){
    if(this.request_points == null || this.request_points<=0){
      this.presentToast('Invalid Points');
    }else if(this.request_points > Number(this.info.available)){
      this.presentToast("Requested amount is more than you can redeem.")
    }else{
      this.transaction.request(this.token,this.request_points).subscribe((res:any)=>{
        if(res.statCode == 200){
          this.presentToast("Request sent successfully");
        }else{
          this.presentToast("Something went wrong. Please try again later.")
        }
      })
    }
  }
}
