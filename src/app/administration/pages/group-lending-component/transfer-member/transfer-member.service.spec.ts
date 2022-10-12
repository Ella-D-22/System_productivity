import { TestBed } from '@angular/core/testing';

import { TransferMemberService } from './transfer-member.service';

describe('TransferMemberService', () => {
  let service: TransferMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
