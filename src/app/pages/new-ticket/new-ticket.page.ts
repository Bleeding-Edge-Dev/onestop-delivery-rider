import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { CameraResultType, CameraSource, Camera } from '@capacitor/camera';
import {
  ActionSheetController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { RatingService } from 'src/app/services/rating.service';
import { get } from 'src/app/services/storage';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.page.html',
  styleUrls: ['./new-ticket.page.scss'],
})
export class NewTicketPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: any ;
  image: any;

  ticketFields:any = new FormGroup({
    orderId: new FormControl('', [Validators.required]),
    issue: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
  });

  imageName: any;
  token = '';
  constructor(
    private plt: Platform,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private apiService: RatingService,
    private router: Router
  ) {}
  async ngOnInit() {
    this.token = await get('token');
  }
  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          // this.addImage(CameraSource.Camera);
        },
      },
      {
        text: 'Choose from Photos',
        icon: 'image',
        handler: () => {
          // this.addImage(CameraSource.Photos);
        },
      },
    ];
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a file',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        },
      });
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: buttons,
    });
    await actionSheet.present();
  }
  submitTicket() {
    if (this.ticketFields.valid) {
      this.apiService
        .raiseTicket(
          this.token,
          this.ticketFields.controls.orderId.value,
          this.ticketFields.controls.issue.value,
          this.ticketFields.controls.contact.value,
          this.image,
          this.imageName
        )
        .subscribe((res: any) => {
          this.toastController
            .create({
              message: res.statMsg,
              duration: 2000,
              position: 'bottom',
            })
            .then((toast) => toast.present());
          this.router.navigate(['/tabs/support-tickets']);
        });
    } else {
      this.toastController
        .create({
          message: 'Please fill all the fields',
          duration: 2000,
          position: 'bottom',
        })
        .then((toast) => toast.present());
    }
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
    this.imageName = file.name;
  }
  // async addImage(source: CameraSource) {
  //   const image = await Camera.getPhoto({
  //     quality: 60,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64,
  //     source,
  //   });

  //   const blobData = this.b64toBlob(
  //     image.base64String,
  //     `image/${image.format}`
  //   );
  //   this.imageName = 'Ticket_' + Date.now() + '.' + image.format;

  //   this.image = blobData;
  // }
  b64toBlob(b64Data:any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  numOnly(event:any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sliderValue: number = 0;
  onSliderChange(event: any) {
    const currentValue = event.target.value;
    this.sliderValue = currentValue;
  }
  onSliderTouchEnd() {
    if (this.sliderValue > 90) {
      this.submitTicket();
      this.sliderValue = 0;
    } else {
      setTimeout(() => {
        this.sliderValue = 0;
      }, 100);
    }
  }
  getColor() {
    if (this.sliderValue > 90) {
      return '#4FCB6D';
    } else {
      return '#FF6565';
    }
  }
}
