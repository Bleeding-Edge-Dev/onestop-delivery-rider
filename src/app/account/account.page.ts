import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { get } from '../services/storage';
import { RateCardModalComponent } from '../components/payout-rate-card/rate-card-modal/rate-card-modal.component';
import { ModalController } from '@ionic/angular';
import { LanguagePreferedModalComponent } from '../components/language-prefered-modal/language-prefered-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  objectKeys = Object.keys
  navOptions={
    'Manage Profile': '/tabs/manage-profile',
    'My Reward Points': '',
    'My Wallet': '/tabs/my-wallet',
    'Change Password' : '/tabs/change-password',
    'Rate Card': RateCardModalComponent,
    'Language Preferences':LanguagePreferedModalComponent,
    'Trip History':'/tabs/trip-history',
    'Session History':'',
    'Issues & Tickets':'',

  }
  token
  constructor(private router:Router , private authService:AuthService, private modalController:ModalController) { }
  async logout(){
    this.token = await get('token');
    this.token = "Bearer "+this.token;
    this.authService.logout(this.token);

  }
  handleNavRoutes(navOption){
    if(navOption == "Rate Card" || navOption == "Language Preferences"){
      this.presentModal(navOption);
    }else{
      this.router.navigate([this.navOptions[navOption]]);
    }
  }
  ngOnInit(
    ) {

  }
  async presentModal(navOption) {
    const modal = await this.modalController.create({
      component: this.navOptions[navOption],
    });
    return await modal.present();
  }
}
