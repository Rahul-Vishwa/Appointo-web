import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { concatMap, of } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-auth-callback',
  imports: [LoaderComponent],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent {
  constructor(
    private auth:AuthService,
    private router:Router,
    private userService:UserService,
    private loader: LoaderService
  ){}

  ngOnInit(){
    this.loader.show();
    this.auth.isLoading$.subscribe(loading=>{
      if (!loading){
        this.auth.isAuthenticated$
        .pipe(
          concatMap(isAuthenticated=>{
            if (isAuthenticated){
              return this.auth.user$;
            }
            return of(null);
          })
        )
        .subscribe(user=>{
          if (user){
            this.saveUser(user);
            this.router.navigate(['/home']);
          }
          else{
            this.router.navigate(['/']);
          }
          this.loader.hide();
        })
      }
    });
  }

  saveUser(user:User){
    this.userService.saveUser({
      Email:user.email,
      Name:user.name,
      Picture:user.picture,
    })
    .subscribe(response=>{
      console.log(response);
    });
  }
}
