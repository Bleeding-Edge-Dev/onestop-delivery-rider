import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CheckModalComponent } from 'src/app/components/check-modal/check-modal.component';

import { get } from 'src/app/services/storage';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-my-rewards-points',
  templateUrl: './my-rewards-points.page.html',
  styleUrls: ['./my-rewards-points.page.scss'],
})
export class MyRewardsPointsPage implements OnInit {
  token:string ="";
  pointsInfo: any = {};
  rewardsHistory: any = [];
  request_points = null;
  constructor(
    private transactionService: TransactionsService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController

  ) { }

  async ngOnInit() {
    this.token = "Bearer " + await  get("token");
    this.getRewardsHistory();
  }
  getRewardsHistory() {
      if(this.token){
        this.transactionService.getRewardsPoints(this.token).subscribe((res: any) => {
          this.pointsInfo = res;
        })

        this.transactionService.getRewardReport(this.token).subscribe((res: any) => {

          this.rewardsHistory = res;
        })
      }
  }
  async presentToast(msg:string,classs?:string){
    this.toastController.create({message:msg,duration:2000,cssClass: classs }).then((toast:any)=>toast.present());
   }
   async doRefresh(event:any){
    this.getRewardsHistory()
    setTimeout(() => {
      event.target.complete();
    }, 200);
   }
  async sendRequest(){
    const loadingMOdal = await this.loadingController.create({
      spinner: 'lines-small',
      animated: true,
    });
    const modal = await this.modalController.create({
      component: CheckModalComponent,
      componentProps:{
        type:"success",
        title:"Request Sent",
        message:"Please wait until the administrator approves your request for payment.",
        buttonText:"Okay",
        route: "/tabs/reawrds",
      }
    });
    await loadingMOdal.present();

    if(this.request_points == null || this.request_points<=0){
      this.presentToast('Invalid Points','toast-error');
      loadingMOdal.dismiss()
    }
    else if(this.request_points > this.pointsInfo.availablePoints){
      
      this.presentToast("Requested amount is more than you can redeem.",'toast-error')
      loadingMOdal.dismiss()
    }
    else{
      this.transactionService.request(this.token,this.request_points).subscribe((res:any)=>{
        if(res.statCode == 200){
          modal.present();
          this.request_points = null;
          loadingMOdal.dismiss()
        }else{
          this.presentToast(res.message,'toast-error')
          loadingMOdal.dismiss()
        }

      },(err)=>{
        this.presentToast("Something went wrong. Please try again later.",'toast-error')
        loadingMOdal.dismiss()
      }
      )
    }

  }

}
