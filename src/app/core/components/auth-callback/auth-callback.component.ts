import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent {
  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  ngOnInit(){
    this.auth.isLoading$.subscribe(loading=>{
      if (!loading){
        this.auth.isAuthenticated$.subscribe(isAuthenticated=>{
          if (isAuthenticated){
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/']);
          }
        })
      }
    });
  }
}
