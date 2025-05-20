import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-invite-members',
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule, ReactiveFormsModule, CardComponent],
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InviteMembersComponent {
  emailControl = new FormControl('');

  

  sendInvite() {
    // if (this.emailControl.valid) {
    //   this.inviteService.sendInvite(this.emailControl.value).subscribe((response) => {
    //     console.log(response);
    //   });
    // }
  }
} 