import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmOnlinePromptComponent } from './confirm-online-prompt/confirm-online-prompt.component';
import { StatusService } from '../../services/status.service';
import { get, remove } from "../../services/storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isRiderOnline: boolean = true;
  token: any;

  constructor(private modalController: ModalController, private statusService: StatusService) { }

  async ngOnInit() {
    this.token = await get("token");
    this.token = "Bearer " + this.token;
    this.getStatus();

  }

  async getStatus() {
    this.statusService.getStatus(this.token).subscribe((res: any) => {
      this.isRiderOnline = res.active == "1" ? true : false;
    });
  }

  toggleRiderActiveService(state: boolean) {
    this.statusService
      .setStatus(this.token, state)
      .subscribe((res: any) => {
        if (res.message == "done") {
          this.isRiderOnline = state;
        }
      });
  }

  async toggleRiderOnline() {
    if (this.isRiderOnline) {
      this.toggleRiderActiveService(false);
    } else {
      const modal = await this.modalController.create({
        component: ConfirmOnlinePromptComponent,
        animated: false,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && data.role === 'confirm') {
        this.toggleRiderActiveService(true);
      }
    }
  }
}
