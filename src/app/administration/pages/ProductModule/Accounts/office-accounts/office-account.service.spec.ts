import { TestBed } from '@angular/core/testing';

import { OfficeAccountService } from './office-account.service';

describe('OfficeAccountService', () => {
  let service: OfficeAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
