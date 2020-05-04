import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './modules/general/home/home.component';
import { ProfileComponent} from './modules/general/profile/profile.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { PublicComponent } from './modules/general/public/public.component';
import { PrivateComponent } from './modules/general/private/private.component';

// Azure AD
import { MsalGuard } from '@azure/msal-angular';



const routes: Routes = [
  {
     path: 'profile',
     component: ProfileComponent,
     canActivate: [
       MsalGuard
     ]
  },
  {
     path: '',
     component: HomeComponent
  },

  {
    path: 'public',
    component: PublicComponent
  },
  // route protegida
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
     path: '**',
     component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
