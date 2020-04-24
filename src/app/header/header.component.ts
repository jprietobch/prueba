import { Component, OnInit } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

   userDetails: KeycloakProfile;
   loggedIn = false;
   userRoles: string [];
   constructor(private keycloakService: KeycloakService) {}

   async ngOnInit() {
     if (await this.keycloakService.isLoggedIn()) {
      this.loggedIn = true;
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.userRoles = this.keycloakService.getUserRoles();
    }
  }

  checkRole( role: string): boolean {
    if (typeof this.userRoles !== 'undefined' && this.userRoles .length > 0) {
      console.log('Buscando el rol', role);
      for (const rol of this.userRoles) {
         console.log('roles:', rol);
      }
      return this.userRoles.includes(role);
    }
    return false;

 }

  async doLogout() {
    await this.keycloakService.logout();
    console.log('click logout!!)');
    this.loggedIn = false;
  }

  async doLogin() {
    await this.keycloakService.login();
    console.log('click login!)');
  }



  isLoggdIn(): boolean {
     return this.loggedIn;
  }


}
