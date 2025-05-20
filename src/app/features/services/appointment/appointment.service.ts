import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookedSlots, GetAppointment, GetLeave } from '../../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http:HttpClient
  ) { }

  getSlots(date:string):Observable<Array<string>> {
    return this.http.get<Array<string>>(`Appointment/GetSlots/${date}`);
  }

  getBookedSlots(date:string):Observable<Array<string>> {
    return this.http.get<Array<string>>('Appointment/GetBookedSlots', {
      params:{
        date
      }
    });
  }
  
  getBookedSlotsWithDetails(date:string):Observable<Array<BookedSlots>> {
    return this.http.get<Array<BookedSlots>>('Appointment/GetBookedSlotsWithDetails', {
      params:{
        date
      }
    });
  }
  
  getUserBookedSlots(date:string):Observable<{ id: number, time: string }> {
    return this.http.get<{ id: number, time: string }>('Appointment/GetUserBookedSlots', {
      params:{
        date
      }
    });
  }

  book(data:any):Observable<any> {
    return this.http.post<any>('Appointment', data);
  }

  editSlot(data:any):Observable<void> {
    return this.http.patch<void>('Appointment', data);
  }

  cancel(id: number):Observable<void> {
    return this.http.delete<void>(`Appointment/${id}`);
  }

  // pass id: 0 if you want api to take user's id
  getUserAppointments(id: number):Observable<Array<GetAppointment>>{
    return this.http.get<Array<GetAppointment>>('Appointment', {
      params:{
        id
      }
    });
  }

  applyLeave(data:any):Observable<{ status: string }> {
    return this.http.post<{ status: string }>('Appointment/ApplyLeave', data);
  }

  getLeave(date: string):Observable<GetLeave | null> {
    return this.http.get<GetLeave | null>('Appointment/GetLeaveByDate', {
      params:{
        date
      }
    });
  }

  editLeave(data:any):Observable<{ status: string }> {
    return this.http.patch<{ status: string }>('Appointment/EditLeave', data);
  }
  
  cancelLeave(id: number):Observable<void> {
    return this.http.delete<void>(`Appointment/CancelLeave/${id}`);
  }
}
