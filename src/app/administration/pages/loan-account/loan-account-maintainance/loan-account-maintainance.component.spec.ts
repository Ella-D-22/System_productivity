import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountMaintainanceComponent } from './loan-account-maintainance.component';

describe('LoanAccountMaintainanceComponent', () => {
  let component: LoanAccountMaintainanceComponent;
  let fixture: ComponentFixture<LoanAccountMaintainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccountMaintainanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAccountMaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
