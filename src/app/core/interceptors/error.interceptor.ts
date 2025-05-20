import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, EMPTY, mergeMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ToastService } from '../../shared/services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toast = inject(ToastService);
    return next(req).pipe(
        catchError((error:HttpErrorResponse)=>{
            console.log();
            toast.error(`<div>${error.error}</div>`);
            return EMPTY;
        })
    );
};
