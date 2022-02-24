import { TestBed } from '@angular/core/testing';

import { HlvsmService } from './hlvsm.service';

describe('HlvsmService', () => {
  let service: HlvsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HlvsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
