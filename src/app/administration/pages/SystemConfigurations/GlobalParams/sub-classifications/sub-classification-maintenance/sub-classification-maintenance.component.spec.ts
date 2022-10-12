import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassificationMaintenanceComponent } from './sub-classification-maintenance.component';

describe('SubClassificationMaintenanceComponent', () => {
  let component: SubClassificationMaintenanceComponent;
  let fixture: ComponentFixture<SubClassificationMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubClassificationMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassificationMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
