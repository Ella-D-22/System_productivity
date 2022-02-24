import { TestBed } from '@angular/core/testing';

import { NhifConfigService } from './nhif-config.service';

describe('NhifConfigService', () => {
  let service: NhifConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhifConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
