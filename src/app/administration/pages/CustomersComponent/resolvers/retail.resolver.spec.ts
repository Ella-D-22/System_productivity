import { TestBed } from '@angular/core/testing';

import { RetailResolver } from './retail.resolver';

describe('RetailResolver', () => {
  let resolver: RetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
