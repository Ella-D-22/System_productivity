import { TestBed } from '@angular/core/testing';

import { TermDepositServiceService } from './term-deposit-service.service';

describe('TermDepositServiceService', () => {
  let service: TermDepositServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermDepositServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
