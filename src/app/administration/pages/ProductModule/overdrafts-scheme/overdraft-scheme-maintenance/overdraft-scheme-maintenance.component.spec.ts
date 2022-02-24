import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftSchemeMaintenanceComponent } from './overdraft-scheme-maintenance.component';

describe('OverdraftSchemeMaintenanceComponent', () => {
  let component: OverdraftSchemeMaintenanceComponent;
  let fixture: ComponentFixture<OverdraftSchemeMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftSchemeMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdraftSchemeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
