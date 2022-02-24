import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitcmMaintenanceComponent } from './hitcm-maintenance.component';

describe('HitcmMaintenanceComponent', () => {
  let component: HitcmMaintenanceComponent;
  let fixture: ComponentFixture<HitcmMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitcmMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitcmMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
