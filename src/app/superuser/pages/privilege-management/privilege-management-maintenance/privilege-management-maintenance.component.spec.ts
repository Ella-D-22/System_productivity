import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeManagementMaintenanceComponent } from './privilege-management-maintenance.component';

describe('PrivilegeManagementMaintenanceComponent', () => {
  let component: PrivilegeManagementMaintenanceComponent;
  let fixture: ComponentFixture<PrivilegeManagementMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilegeManagementMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeManagementMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
