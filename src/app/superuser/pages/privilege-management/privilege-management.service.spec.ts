import { TestBed } from '@angular/core/testing';

import { PrivilegeManagementService } from './privilege-management.service';

describe('PrivilegeManagementService', () => {
  let service: PrivilegeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
