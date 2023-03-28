import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { MenuPopoverComponent } from "../menu-popover/menu-popover.component";
import { LogoutComponent } from "./logout/logout.component";
import { AppModule } from "../app.module";
import { SharedModule } from "../shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    SharedModule,
    
  ],
  declarations: [Tab1Page, LogoutComponent],
})
export class Tab1PageModule {}
