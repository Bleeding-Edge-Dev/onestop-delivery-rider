import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor copy';
import { SharedModule } from './shared.module';
// Import torch plugin
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { DatePipe } from '@angular/common';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NetWorkFailureInterceptor } from './interceptor/networkFailure.interceptor';
import { NetworkFailureModalComponent } from './components/network-failure-modal/network-failure-modal.component';
@NgModule({
  declarations: [AppComponent,NetworkFailureModalComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'md',
    }),
    AppRoutingModule,
    SharedModule,
    IonicModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetWorkFailureInterceptor,
      multi: true,
    },
    HTTP,
    LocationAccuracy,
    AndroidPermissions,
    AppVersion,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
