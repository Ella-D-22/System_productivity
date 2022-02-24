import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAccountsMaintenanceComponent } from './office-accounts-maintenance.component';

describe('OfficeAccountsMaintenanceComponent', () => {
  let component: OfficeAccountsMaintenanceComponent;
  let fixture: ComponentFixture<OfficeAccountsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeAccountsMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAccountsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
