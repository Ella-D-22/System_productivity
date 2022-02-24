import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivsmMaintenanceComponent } from './hivsm-maintenance.component';

describe('HivsmMaintenanceComponent', () => {
  let component: HivsmMaintenanceComponent;
  let fixture: ComponentFixture<HivsmMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivsmMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HivsmMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
