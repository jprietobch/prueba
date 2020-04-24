import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'rhsoo-angular-bch';
  loggedIn = false;
  userDetails: KeycloakProfile;
  userRoles: string [];


  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {

    console.log('isLoggedIn:', this.keycloakService.isLoggedIn());
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.userRoles = this.keycloakService.getUserRoles();

      console.log('ngOnInit appComponent');

      /*for (let rol of this.userRoles) {
        console.log('rol:', rol);
      }*/

    }
  }

 /* getRoles(){
    for (let rol of this.userRoles) {
      console.log('rol:', rol);
    }

  }
*/

 async doLogout() {
   console.log('app component - click logout!!)');
   await this.keycloakService.logout();
   this.loggedIn = false;
 }

 async doLogin() {
   console.log('app componet - click login!)');
   await this.keycloakService.login();
 }

}

