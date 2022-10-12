import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingschemeMaintenanceComponent } from './savingscheme-maintenance.component';

describe('SavingschemeMaintenanceComponent', () => {
  let component: SavingschemeMaintenanceComponent;
  let fixture: ComponentFixture<SavingschemeMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingschemeMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingschemeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
