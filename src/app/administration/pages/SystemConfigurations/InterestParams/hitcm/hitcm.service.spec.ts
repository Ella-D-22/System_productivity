import { TestBed } from '@angular/core/testing';

import { HitcmService } from './hitcm.service';

describe('HitcmService', () => {
  let service: HitcmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitcmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
