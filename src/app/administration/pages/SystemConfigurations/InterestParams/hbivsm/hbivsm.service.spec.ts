import { TestBed } from '@angular/core/testing';

import { HbivsmService } from './hbivsm.service';

describe('HbivsmService', () => {
  let service: HbivsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HbivsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
