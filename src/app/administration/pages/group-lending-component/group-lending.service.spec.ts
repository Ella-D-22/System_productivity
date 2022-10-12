import { TestBed } from '@angular/core/testing';

import { GroupLendingService } from './group-lending.service';

describe('GroupLendingService', () => {
  let service: GroupLendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupLendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
