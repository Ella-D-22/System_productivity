import { TestBed } from '@angular/core/testing';

import { HivsmService } from './hivsm.service';

describe('HivsmService', () => {
  let service: HivsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HivsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
