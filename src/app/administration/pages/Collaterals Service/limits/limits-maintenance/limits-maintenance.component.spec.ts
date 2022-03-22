import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsMaintenanceComponent } from './limits-maintenance.component';

describe('LimitsMaintenanceComponent', () => {
  let component: LimitsMaintenanceComponent;
  let fixture: ComponentFixture<LimitsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitsMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
