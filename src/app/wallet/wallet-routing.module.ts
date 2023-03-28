import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPage } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPage,
  },
  {
    path: 'past',
    loadChildren: () =>
      import('./past/past.module').then((m) => m.PastPageModule),
  },

  {
    path: 'pending',
    loadChildren: () =>
      import('./pending/pending.module').then((m) => m.PendingPageModule),
  },
  {
    path: 'credit-notes',
    loadChildren: () => import('./credit-notes/credit-notes.module').then( m => m.CreditNotesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
