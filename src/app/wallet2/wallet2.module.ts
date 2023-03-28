import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Wallet2PageRoutingModule } from './wallet2-routing.module';

import { Wallet2Page } from './wallet2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Wallet2PageRoutingModule
  ],
  declarations: [Wallet2Page]
})
export class Wallet2PageModule {}
