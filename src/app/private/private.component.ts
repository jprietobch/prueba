import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';



@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})

export class PrivateComponent implements OnInit {

  userDetails: KeycloakProfile;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
       this.userDetails = await this.keycloakService.loadUserProfile();
    }
  }

}
