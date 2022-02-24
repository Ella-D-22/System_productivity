import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanproductMaintenanceComponent } from './loanproduct-maintenance.component';

describe('LoanproductMaintenanceComponent', () => {
  let component: LoanproductMaintenanceComponent;
  let fixture: ComponentFixture<LoanproductMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanproductMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanproductMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
