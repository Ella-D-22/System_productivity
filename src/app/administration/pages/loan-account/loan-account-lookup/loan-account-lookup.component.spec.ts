import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountLookupComponent } from './loan-account-lookup.component';

describe('LoanAccountLookupComponent', () => {
  let component: LoanAccountLookupComponent;
  let fixture: ComponentFixture<LoanAccountLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccountLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAccountLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
