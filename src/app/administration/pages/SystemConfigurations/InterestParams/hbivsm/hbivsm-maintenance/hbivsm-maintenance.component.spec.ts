import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HbivsmMaintenanceComponent } from './hbivsm-maintenance.component';

describe('HbivsmMaintenanceComponent', () => {
  let component: HbivsmMaintenanceComponent;
  let fixture: ComponentFixture<HbivsmMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HbivsmMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HbivsmMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
