import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../tabPages/feed/feed.module').then(m => m.FeedPageModule)
      },
      // {
      //   path: 'tab1',
      //   loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      // },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('../wallet/wallet.module').then(m => m.WalletPageModule)
      },
      {
        path: 'payouts',
        loadChildren: () => import('../tabPages/payouts/payouts.module').then(m => m.PayoutsPageModule)
      },
      {
        path: 'pocket',
        loadChildren: () => import('../tabPages/pocket/pocket.module').then( m => m.PocketPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../tabPages/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/tab1',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
