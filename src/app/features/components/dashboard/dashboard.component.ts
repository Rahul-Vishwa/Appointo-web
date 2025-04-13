import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private auth:AuthService,
    private http:HttpClient
  ){}

  ngOnInit(){
    this.http.get('https://api.taskzen.local/WeatherForecast').subscribe(console.log);
  }

  logout(){
    this.auth.logout();
  }
}
