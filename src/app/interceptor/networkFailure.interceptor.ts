import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NetworkFailureModalComponent } from '../components/network-failure-modal/network-failure-modal.component';

@Injectable()
export class NetWorkFailureInterceptor implements HttpInterceptor {
  constructor(private modalController: ModalController) {}

  private failedApiCount = 0;
  private readonly maxFailedApiCount = 2;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          // Internet connection error
          this.failedApiCount++;
          if (this.failedApiCount === this.maxFailedApiCount) {
            this.presentModal();
          }
        }
        return throwError(error);
      })
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NetworkFailureModalComponent,
    });
    await modal.present();
  }
}

