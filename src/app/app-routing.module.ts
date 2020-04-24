import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PublicComponent} from './public/public.component';
import { PrivateComponent} from './private/private.component';
import { NotFoundComponent} from './not-found/not-found.component';

import { AppAuthGuard } from './app.authguard';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
     path: 'public',
     component:  PublicComponent,
  },
  {
      path: 'private',
      component: PrivateComponent,
      canActivate: [AppAuthGuard],
      data: {
        roles: ['User']
       }

  },
  {
     path: 'admin',
     component: AdminComponent,
     canActivate: [AppAuthGuard],
     data: {
       roles: ['AdminWeb']
      }

  },
  {
      path: '**',
      component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard],
  declarations: []
})
export class AppRoutingModule { }
