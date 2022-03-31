import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGroupMaintenanceComponent } from './main-group-maintenance.component';

describe('MainGroupMaintenanceComponent', () => {
  let component: MainGroupMaintenanceComponent;
  let fixture: ComponentFixture<MainGroupMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGroupMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGroupMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
