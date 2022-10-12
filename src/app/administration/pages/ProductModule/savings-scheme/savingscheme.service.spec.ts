import { TestBed } from '@angular/core/testing';

import { SavingschemeService } from './savingscheme.service';

describe('SavingschemeService', () => {
  let service: SavingschemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingschemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
