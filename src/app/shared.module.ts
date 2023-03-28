import {
  NgModule,
  Directive,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
  ElementRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuPopoverComponent } from "./menu-popover/menu-popover.component";

@NgModule({
  imports: [CommonModule],
  declarations: [MenuPopoverComponent],
  exports: [MenuPopoverComponent],
})
export class SharedModule {}
