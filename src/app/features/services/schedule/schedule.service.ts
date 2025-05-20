import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http:HttpClient,
  ) { }

  saveSchedule(data:any):Observable<any>{
    return this.http.post<any>('Schedule', data);
  }

  getSchedules():Observable<Schedule[]>{
    return this.http.get<Schedule[]>('Schedule');
  }
}
