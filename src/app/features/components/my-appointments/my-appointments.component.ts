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
import { convert12HrToDate } from '../../../shared/utility/date';

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
  pagination: { page: number, pageSize: number, totalCount: number, totalPages: number } = {
    page: 1,
    pageSize: 6,
    totalCount: 0,
    totalPages: 0
  };

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
      this.appointment.getUserAppointments(
        this.userId(),
        this.pagination.page,
        this.pagination.pageSize
      )
      .subscribe(appointments=>{
        this.appointments.set(appointments.appointments);
        this.pagination.totalCount = appointments.totalCount;
        this.pagination.totalPages = Math.ceil(appointments.totalCount / this.pagination.pageSize);
      })
    );
  }

  decreasePage(){
    if (this.pagination.page > 1){
      this.pagination.page -= 1;
      this.getAppointments();
    }
  }

  increasePage(){
    if (this.pagination.page < this.pagination.totalPages){
      this.pagination.page += 1;
      this.getAppointments();
    }
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

  isPastAppointment(date: string, time: string){
    const parsedDate = convert12HrToDate(time, date);
    return parsedDate <= new Date();
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
