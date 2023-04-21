import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController } from '@ionic/angular';
import { StatusService } from 'src/app/services/status.service';
import { get } from 'src/app/services/storage';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

constructor(private navCtrl: NavController,
  private statusService: StatusService){}
isRiderOnline: boolean = true;
token: any;


ngOnInit() {
  this.getStatus();
}
async getStatus() {
  this.token = await get("token");
  this.token = "Bearer " + this.token;
  setInterval(() => {
    this.statusService.getStatus(this.token).subscribe((res: any) => {
      this.isRiderOnline = res.active == "1" ? true : false;
    });
  }, 200);
}


  goToTab(tabName: string){
    this.navCtrl.navigateForward('/tabs/tabs/' + tabName);
  }
}