import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  return inject(AuthService).getAccessTokenSilently()
    .pipe(
      mergeMap((token)=>{
        if (token){
          const authRequest = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          return next(authRequest);
        }
        return next(req);
      })
    );
};
