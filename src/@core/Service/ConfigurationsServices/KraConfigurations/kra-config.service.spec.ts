import { TestBed } from '@angular/core/testing';

import { KraConfigService } from './kra-config.service';

describe('KraConfigService', () => {
  let service: KraConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KraConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
