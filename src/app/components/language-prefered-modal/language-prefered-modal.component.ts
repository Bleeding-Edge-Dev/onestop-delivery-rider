import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-language-prefered-modal',
  templateUrl: './language-prefered-modal.component.html',
  styleUrls: ['./language-prefered-modal.component.scss'],
})
export class LanguagePreferedModalComponent implements OnInit {
  languageSelected = "English";
  languages = [
    "English",
    "Hindi",
    "Marathi",
  ]

  constructor( private modalController:ModalController) { }

  ngOnInit() {}
  onDismiss() {
    this.modalController.dismiss();
  }
  onConfirm() {
    this.modalController.dismiss({
      role: 'confirm'
    });
  }
  onLanguageSelected(language: string) {
    this.languageSelected = language;
  }


}
