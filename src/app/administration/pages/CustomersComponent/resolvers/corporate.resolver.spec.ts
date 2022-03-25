import { TestBed } from '@angular/core/testing';

import { CorporateResolver } from './corporate.resolver';

describe('CorporateResolver', () => {
  let resolver: CorporateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CorporateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
