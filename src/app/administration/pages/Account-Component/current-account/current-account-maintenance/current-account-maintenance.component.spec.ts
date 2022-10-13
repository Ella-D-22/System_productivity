import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountMaintenanceComponent } from './current-account-maintenance.component';

describe('CurrentAccountMaintenanceComponent', () => {
  let component: CurrentAccountMaintenanceComponent;
  let fixture: ComponentFixture<CurrentAccountMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAccountMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAccountMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
