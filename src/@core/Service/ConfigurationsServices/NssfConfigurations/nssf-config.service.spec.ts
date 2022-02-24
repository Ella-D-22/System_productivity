import { TestBed } from '@angular/core/testing';

import { NssfConfigService } from './nssf-config.service';

describe('NssfConfigService', () => {
  let service: NssfConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NssfConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
