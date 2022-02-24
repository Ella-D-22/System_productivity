import { TestBed } from '@angular/core/testing';

import { LoanproductService } from './loanproduct.service';

describe('LoanproductService', () => {
  let service: LoanproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
