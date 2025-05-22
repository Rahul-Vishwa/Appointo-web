import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../features/components/home/home.component').then(m => m.HomeComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('../features/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'schedule',
                loadComponent: () => import('../features/components/schedule/schedule.component').then(m => m.ScheduleComponent)
            },
            {
                path: 'appointment-actions',
                loadComponent: () => import('../features/components/appointment-actions/appointment-actions.component').then(m => m.AppointmentActionsComponent)
            },
            {
                path: 'book-appointment',
                loadComponent: () => import('../features/components/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent)
            },
            {
                path: 'appointments',
                loadComponent: () => import('../features/components/my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
            },
        ]
    }
]; 