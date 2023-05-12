import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HTTP } from "@ionic-native/http/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { AuthInterceptor } from "./interceptor/auth.interceptor copy";
import { MenuPopoverComponent } from "./menu-popover/menu-popover.component";
import { SharedModule } from "./shared.module";

// Import torch plugin
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { WalletPageModule } from "./wallet/wallet.module";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { DatePipe } from "@angular/common";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    HTTP,
    OneSignal,
    SplashScreen,
    LocationAccuracy,
    Geolocation,
    AndroidPermissions,
    AppVersion,
    InAppBrowser,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
