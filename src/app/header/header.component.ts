import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmOnlinePromptComponent } from './confirm-online-prompt/confirm-online-prompt.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isRiderOnline: boolean = false;
  constructor(private modalController: ModalController) { }

  async toggleRiderOnline() {
    if(this.isRiderOnline) {

      this.isRiderOnline = false;
    } else {
      const modal = await this.modalController.create({
        component: ConfirmOnlinePromptComponent,
        animated: false,
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if(data && data.role === 'confirm') {
        this.isRiderOnline = true;
      }
    }
  }
  ngOnInit() {}

}
