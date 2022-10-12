import { TestBed } from '@angular/core/testing';

import { SubClassificationService } from './sub-classification.service';

describe('SubClassificationService', () => {
  let service: SubClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
