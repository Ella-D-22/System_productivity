import { TestBed } from '@angular/core/testing';

import { GuarantosService } from './guarantos.service';

describe('GuarantosService', () => {
  let service: GuarantosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuarantosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
