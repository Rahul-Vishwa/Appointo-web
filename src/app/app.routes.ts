import { Routes } from '@angular/router';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { LandingPageComponent } from './features/components/landing-page/landing-page.component';

export const routes: Routes = [
    {path:'', loadComponent:()=>LandingPageComponent},
    {path:'dashboard', loadComponent:()=>DashboardComponent}
];
