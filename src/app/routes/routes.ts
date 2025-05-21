import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../features/components/home/home.component').then(m => m.HomeComponent),
        children: [
            {
                path: 'schedule',
                loadComponent: () => import('../features/components/schedule/schedule.component').then(m => m.ScheduleComponent)
            },
            {
                path: 'appointments-view',
                loadComponent: () => import('../features/components/appointments-view/appointments-view.component').then(m => m.AppointmentsViewComponent)
            },
            {
                path: 'book-appointment',
                loadComponent: () => import('../features/components/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent)
            },
            {
                path: 'appointments',
                loadComponent: () => import('../features/components/my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
            },
            {
                path: 'invite-members',
                loadComponent: () => import('../features/components/invite-members/invite-members.component').then(m => m.InviteMembersComponent)
            },
        ]
    }
]; 