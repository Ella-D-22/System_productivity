import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCustomerMaintenanceComponent } from './corporate-customer-maintenance.component';

describe('CorporateCustomerMaintenanceComponent', () => {
  let component: CorporateCustomerMaintenanceComponent;
  let fixture: ComponentFixture<CorporateCustomerMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateCustomerMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCustomerMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
