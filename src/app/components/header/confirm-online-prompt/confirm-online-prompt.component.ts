import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-online-prompt',
  templateUrl: './confirm-online-prompt.component.html',
  styleUrls: ['./confirm-online-prompt.component.scss'],
})
export class ConfirmOnlinePromptComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  onDismiss(event: any) {
    if (
      event.target.classList.contains('backdrop') ||
      event.target.classList.contains('dismiss-btn')
    ) {
      this.modalController.dismiss();
    }
  }
  onConfirm() {
    this.modalController.dismiss({
      role: 'confirm',
    });
  }

  ngOnInit() {}
}
