import { TestBed } from '@angular/core/testing';

import { CurrentSchemeService } from './current-scheme.service';

describe('CurrentSchemeService', () => {
  let service: CurrentSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
