import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';
import { ProfileComponent } from './modules/general/profile/profile.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// azure AD
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PublicComponent } from './modules/general/public/public.component';
import { PrivateComponent } from './modules/general/private/private.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    PublicComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MsalModule.forRoot({
      auth: {
        // personal app jprieto@live.cl
        //clientId: '1873fea6-3297-45e9-80bf-67b1010ad459',
        //authority: "https://login.microsoftonline.com/common",

        // banchile app
        clientId: '000f7bc0-9623-4b90-9b90-3e1022170da4',
        authority: 'https://login.microsoftonline.com/banchile.onmicrosoft.com',
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
