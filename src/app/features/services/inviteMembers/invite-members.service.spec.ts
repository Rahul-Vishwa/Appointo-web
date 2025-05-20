import { TestBed } from '@angular/core/testing';

import { InviteMembersService } from './invite-members.service';

describe('InviteMembersService', () => {
  let service: InviteMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
