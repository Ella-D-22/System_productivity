import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLendingMaintenanceComponent } from './group-lending-maintenance.component';

describe('GroupLendingMaintenanceComponent', () => {
  let component: GroupLendingMaintenanceComponent;
  let fixture: ComponentFixture<GroupLendingMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLendingMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLendingMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
