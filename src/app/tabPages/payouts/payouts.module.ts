import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayoutsPageRoutingModule } from './payouts-routing.module';

import { PayoutsPage } from './payouts.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    PayoutsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PayoutsPage]
})
export class PayoutsPageModule { }
