import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, take } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated$;
};
