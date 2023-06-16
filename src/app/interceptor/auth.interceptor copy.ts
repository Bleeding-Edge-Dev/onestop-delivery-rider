import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import jsSHA from 'jssha';
import { get, set } from '../services/storage';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  uid: any;
  uuid: string = '';
  token: any;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private authService: AuthService
  ) {
    this.getuid();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.getuid()).pipe(
      switchMap((token) => {
        request = request.clone({
          body: { ...request.body, ...{ key: token } },
        });
        if (!request.headers.has('Content-Type')) {
          request = request.clone({
            setHeaders: {
              'content-type': 'application/json',
            },
          });
        }

        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.logout();
            }
            return throwError(error);
          })
        );
      })
    );
  }

  async getuid() {
    const info = await Device.getId();
    let shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(info.identifier);
    let h = await shaObj.getHash('HEX');
    await set('uuid', h);
    this.uuid = h;
    return h;
  }
  async logout() {
    this.token = await get('token');
    this.authService.logout(this.token);
  }
}
