import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs = [
    { label: 'Feed', icon: 'feed', routerLink: '/tabs/feed', isActive: false },
    { label: 'Payouts', icon: 'payouts', routerLink: '/tabs/payouts', isActive: false },
    { label: 'Pocket', icon: 'pocket', routerLink: '/tabs/pocket', isActive: false },
    { label: 'Account', icon: 'account', routerLink: '/tabs/account', isActive: false },
  ];

  constructor(private router: Router, private navCtrl: NavController) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const activeTab = this.tabs.find(tab => event.url.includes(tab.routerLink));
        if (activeTab) {
          this.tabs.forEach(tab => (tab.isActive = false));
          activeTab.isActive = true;
        }
      }
    });
  }

  navigateToTab(tab) {
    this.tabs.forEach(t => (t.isActive = false));
    tab.isActive = true;

    this.navCtrl.navigateRoot(tab.routerLink);
  }
}
