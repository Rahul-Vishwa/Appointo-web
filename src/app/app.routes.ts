import { Routes } from '@angular/router';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { LandingPageComponent } from './features/components/landing-page/landing-page.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { AuthCallbackComponent } from './core/components/auth-callback/auth-callback.component';

export const routes: Routes = [
    {
        path:'', 
        loadComponent:()=>LandingPageComponent
    },
    {
        path:'callback', 
        loadComponent:()=>AuthCallbackComponent,
    },
    {
        path:'dashboard', 
        loadComponent:()=>DashboardComponent,
        canActivate:[authGuardFn]
    }
];
