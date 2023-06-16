import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@awesome-cordova-plugins/in-app-browser/ngx';
import { get } from 'src/app/services/storage';
@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
})
export class DepositModalComponent implements OnInit {
  depositAmount: number = 1;

  options: InAppBrowserOptions = {
    location: 'yes', //Or 'no'
    hidden: 'no', //Or  'yes'
    zoom: 'yes', //Android only ,shows browser zoom controls
    hideurlbar: 'yes', //Or 'no'
    hidenavigationbuttons: 'yes',
    toolbarcolor: '#3D534E',
    closebuttoncolor: '#ffffff',
  };

  constructor(
    private modalController: ModalController,
    private iab: InAppBrowser
  ) {}
  amount: number = 0;

  ngOnInit() {}
  onDismiss(event: any) {
    if (
      event.target.classList.contains('backdrop') ||
      event.target.classList.contains('dismiss-btn')
    ) {
      this.modalController.dismiss();
    }
  }
  onConfirm() {
    this.handleDeposit();
    this.modalController.dismiss();
  }

  // Token and Ampunt
  //  depositPocket.php

  async handleDeposit() {
    var token = await get('token');
    token = 'Bearer ' + token;

    const url =
      'https://onestopdelivery.in/api/riderApp/api/depositPocket.php?token=' +
      token +
      '&amount=' +
      this.depositAmount;
    console.log(url);
    const target = '_blank';
    const browser = this.iab.create(url, target, this.options);
    browser.on('loadstart').subscribe((event) => {
      console.log('event', event, JSON.stringify(event));
    });
  }

  // HandleDeposit() {

  //   const browser = this.iab.create(url, target, this.options);
  //   browser.on("loadstart").subscribe((event) => {
  //     console.log("event", event, JSON.stringify(event));
  //     if (event.url.includes("https://onestopdelivery.in/api/riderApi/api/payu/transactionSuccess.php")) {
  //       browser.close();
  //       this.presentAlert().then(async () => {
  //         await remove("cart");
  //         this.router.navigate(["/tabs/tab2"]);
  //       });
}
