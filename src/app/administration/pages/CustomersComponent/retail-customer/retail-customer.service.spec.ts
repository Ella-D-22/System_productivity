import { TestBed } from '@angular/core/testing';

import { RetailCustomerService } from './retail-customer.service';

describe('RetailCustomerService', () => {
  let service: RetailCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
