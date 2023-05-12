import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { OrdersComponent } from './orders/orders.component';
import { OfflineBannerComponent } from './offline-banner/offline-banner.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FeedPage, OrdersComponent, OfflineBannerComponent]
})
export class FeedPageModule { }
