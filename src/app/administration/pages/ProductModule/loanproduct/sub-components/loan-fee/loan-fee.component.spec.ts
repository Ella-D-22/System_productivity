import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFeeComponent } from './loan-fee.component';

describe('LoanFeeComponent', () => {
  let component: LoanFeeComponent;
  let fixture: ComponentFixture<LoanFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
