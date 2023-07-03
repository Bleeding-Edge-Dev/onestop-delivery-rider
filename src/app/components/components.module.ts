import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { NewOrderModalComponent } from './new-order-modal/new-order-modal.component';
import { HeaderComponent } from './header/header.component';
import { MyTargetComponent } from './my-target/my-target.component';
import { PayoutRateCardComponent } from './payout-rate-card/payout-rate-card.component';
import { RateCardModalComponent } from './payout-rate-card/rate-card-modal/rate-card-modal.component';
import { LanguagePreferedModalComponent } from './language-prefered-modal/language-prefered-modal.component';
import { CheckModalComponent } from './check-modal/check-modal.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NewOrderModalComponent,
    HeaderComponent,MyTargetComponent,PayoutRateCardComponent,RateCardModalComponent,LanguagePreferedModalComponent,
    CheckModalComponent
  ],
  imports: [
    CommonModule,IonicModule,RouterModule
  ],
  exports: [NewOrderModalComponent,HeaderComponent,MyTargetComponent,PayoutRateCardComponent,RateCardModalComponent,CheckModalComponent,LanguagePreferedModalComponent],
})
export class ComponentsModule { }







