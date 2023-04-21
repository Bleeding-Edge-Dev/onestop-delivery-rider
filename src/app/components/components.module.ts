import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { NewOrderModalComponent } from './new-order-modal/new-order-modal.component';
import { HeaderComponent } from './header/header.component';
import { MyTargetComponent } from './my-target/my-target.component';
import { PayoutRateCardComponent } from './payout-rate-card/payout-rate-card.component';



@NgModule({
  declarations: [NewOrderModalComponent,HeaderComponent,MyTargetComponent,PayoutRateCardComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [NewOrderModalComponent,HeaderComponent,MyTargetComponent,PayoutRateCardComponent],
})
export class ComponentsModule { }







