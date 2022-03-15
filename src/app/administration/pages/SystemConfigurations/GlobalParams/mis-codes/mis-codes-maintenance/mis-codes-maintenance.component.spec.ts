import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCodesMaintenanceComponent } from './mis-codes-maintenance.component';

describe('MisCodesMaintenanceComponent', () => {
  let component: MisCodesMaintenanceComponent;
  let fixture: ComponentFixture<MisCodesMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCodesMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCodesMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
