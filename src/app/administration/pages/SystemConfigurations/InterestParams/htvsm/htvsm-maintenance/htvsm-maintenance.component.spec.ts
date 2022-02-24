import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtvsmMaintenanceComponent } from './htvsm-maintenance.component';

describe('HtvsmMaintenanceComponent', () => {
  let component: HtvsmMaintenanceComponent;
  let fixture: ComponentFixture<HtvsmMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtvsmMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtvsmMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
