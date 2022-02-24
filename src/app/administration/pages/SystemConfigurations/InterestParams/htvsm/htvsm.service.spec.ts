import { TestBed } from '@angular/core/testing';

import { HtvsmService } from './htvsm.service';

describe('HtvsmService', () => {
  let service: HtvsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtvsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
