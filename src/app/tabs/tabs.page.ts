import { Component } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs = [
    { label: 'Feed', icon: 'feed', routerLink: '/tabs/tabs/feed', isActive: true },
    { label: 'Payouts', icon: 'payouts', routerLink: '/tabs/tabs/payouts', isActive: false },
    { label: 'Pocket', icon: 'pocket', routerLink: '/tabs/tabs/pocket', isActive: false },
    { label: 'Account', icon: 'account', routerLink: '/tabs/tabs/account', isActive: false },
    // { label: 'Feed', icon: 'feed', routerLink: '/tabs/tabs/tab1', isActive: false },
    // { label: 'Payouts', icon: 'payouts', routerLink: '/tabs/tabs/tab2', isActive: false },
    // { label: 'Pocket', icon: 'pocket', routerLink: '/tabs/tabs/tab3', isActive: false },
    // { label: 'Account', icon: 'account', routerLink: '/tabs/tabs/wallet', isActive: false },

  ];

  constructor(private navCtrl: NavController) { }

  navigateToTab(tab) {
    this.tabs.forEach(t => t.isActive = false);
    tab.isActive = true;

    this.navCtrl.navigateRoot(tab.routerLink);
  }


}
