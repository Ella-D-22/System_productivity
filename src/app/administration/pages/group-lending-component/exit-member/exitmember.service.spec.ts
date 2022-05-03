import { TestBed } from '@angular/core/testing';

import { ExitmemberService } from './exitmember.service';

describe('ExitmemberService', () => {
  let service: ExitmemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExitmemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
