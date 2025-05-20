import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InviteMembersService {

  constructor(
    private http: HttpClient
  ) { }

  sendInvite(email: string) {
    return this.http.post('http://localhost:3000/invite', { email });
  }
}
