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
            let errorMessage = 'An unexpected error occurred.';

            if (error.status === 0) {
                errorMessage = 'Unable to connect to the server. Please check your network.';
            } else if (typeof error.error === 'string') {
                errorMessage = error.error;
            } else if (error.error?.message) {
                errorMessage = error.error.message;
            } else if (typeof error.error === 'object') {
                errorMessage = Object.values(error.error)
                .flat()
                .join('<br>');
            }

            toast.error(`<div>${errorMessage}</div>`);
            return EMPTY;
        })
    );
};
