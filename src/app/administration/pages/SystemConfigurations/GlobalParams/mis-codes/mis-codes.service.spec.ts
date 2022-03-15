import { TestBed } from '@angular/core/testing';

import { MisCodesService } from './mis-codes.service';

describe('MisCodesService', () => {
  let service: MisCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
