import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailCustomerMaintenanceComponent } from './retail-customer-maintenance.component';

describe('RetailCustomerMaintenanceComponent', () => {
  let component: RetailCustomerMaintenanceComponent;
  let fixture: ComponentFixture<RetailCustomerMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailCustomerMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailCustomerMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
