import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanproductLookupComponent } from './loanproduct-lookup.component';

describe('LoanproductLookupComponent', () => {
  let component: LoanproductLookupComponent;
  let fixture: ComponentFixture<LoanproductLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanproductLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanproductLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
