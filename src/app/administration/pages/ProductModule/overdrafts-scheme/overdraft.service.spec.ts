import { TestBed } from '@angular/core/testing';

import { OverdraftService } from './overdraft.service';

describe('OverdraftService', () => {
  let service: OverdraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverdraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
