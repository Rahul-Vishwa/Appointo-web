import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-public-header',
  imports: [],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.css'
})
export class PublicHeaderComponent {
  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  login(){
    this.auth.loginWithRedirect();
  }

  getStarted(){
    this.auth.loginWithRedirect({
      authorizationParams:{
        prompt:'login'
      }
    });
  }
}
