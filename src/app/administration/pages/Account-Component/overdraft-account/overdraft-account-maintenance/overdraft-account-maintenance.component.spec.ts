import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftAccountMaintenanceComponent } from './overdraft-account-maintenance.component';

describe('OverdraftAccountMaintenanceComponent', () => {
  let component: OverdraftAccountMaintenanceComponent;
  let fixture: ComponentFixture<OverdraftAccountMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftAccountMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdraftAccountMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
