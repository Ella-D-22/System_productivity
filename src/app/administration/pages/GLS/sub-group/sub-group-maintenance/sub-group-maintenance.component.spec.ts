import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupMaintenanceComponent } from './sub-group-maintenance.component';

describe('SubGroupMaintenanceComponent', () => {
  let component: SubGroupMaintenanceComponent;
  let fixture: ComponentFixture<SubGroupMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
