import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from "../../../shared/components/card/card.component";
import { AppointmentService } from '../../services/appointment/appointment.service';
import { Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Time12hrPipe } from '../../../shared/pipes/time12hr.pipe';
import { GetAppointment } from '../../models/Appointment';
import { ToastService } from '../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-appointments',
  imports: [
    CardComponent,
    DatePipe,
    Time12hrPipe
  ],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppointmentsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private appointment: AppointmentService = inject(AppointmentService);
  appointments: WritableSignal<Array<GetAppointment>> = signal([]);
  private userId: WritableSignal<number> = signal(0);
  userName: WritableSignal<string | null> = signal(null); 

  constructor(
    private toast: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      if (params && params['id'] && params['name']){
        this.userId.set(params['id']);
        this.userName.set(params['name']);
      }
      this.getAppointments();
    });
  }

  private getAppointments(){
    this.subscriptions.add(
      this.appointment.getUserAppointments(this.userId())
        .subscribe(appointments=>{
          this.appointments.set(appointments);
        })
    );
  }

  cancel(id:number){
    this.subscriptions.add(
      this.appointment.cancel(
        id
      )
      .subscribe(() => {
        this.toast.info('Appointment Cancelled.');
        this.getAppointments();
      })
    );
  }

  edit(appointment:GetAppointment){
    this.router.navigate(['../book-appointment'], { 
      queryParams: { 
        id: appointment.id,
        date: appointment.date,
      }, 
      relativeTo: this.activatedRoute 
    });
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
