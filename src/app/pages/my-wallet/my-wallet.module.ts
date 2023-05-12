import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyWalletPageRoutingModule } from './my-wallet-routing.module';

import { MyWalletPage } from './my-wallet.page';
import { WithdrawModalComponent } from './withdraw-modal/withdraw-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyWalletPageRoutingModule
  ],
  declarations: [MyWalletPage,WithdrawModalComponent],
})
export class MyWalletPageModule {}
