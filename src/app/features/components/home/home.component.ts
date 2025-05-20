import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { PrivateHeaderComponent } from "../../../shared/components/private-header/private-header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, PrivateHeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private auth:AuthService,
  ){}

  ngOnInit(){
  }

  logout(){
    this.auth.logout();
  }
} 