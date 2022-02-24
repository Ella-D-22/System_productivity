import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HlvsmMaintenanceComponent } from './hlvsm-maintenance.component';

describe('HlvsmMaintenanceComponent', () => {
  let component: HlvsmMaintenanceComponent;
  let fixture: ComponentFixture<HlvsmMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HlvsmMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HlvsmMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
