import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'payouts',
        loadChildren: () => import('../payouts/payouts.module').then(m => m.PayoutsPageModule)
      },
      {
        path: 'pocket',
        loadChildren: () => import('../pocket/pocket.module').then( m => m.PocketPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
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
        path: 'order',
        loadChildren: () => import('../pages/order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'trip-history',
        loadChildren: () => import('../pages/trip-history/trip-history.module').then( m => m.TripHistoryPageModule)
      },
      {
        path: 'manage-profile',
        loadChildren: () => import('../pages/manage-profile/manage-profile.module').then( m => m.ManageProfilePageModule)
      },
      {
        path: 'session-history',
        loadChildren: () => import('../pages/session-history/session-history.module').then( m => m.SessionHistoryPageModule)
      },
      {
        path: 'language-preferences',
        loadChildren: () => import('../pages/language-preferences/language-preferences.module').then( m => m.LanguagePreferencesPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('../pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
      },
      {
        path: 'my-wallet',
        loadChildren: () => import('../pages/my-wallet/my-wallet.module').then( m => m.MyWalletPageModule)
      },
    
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
