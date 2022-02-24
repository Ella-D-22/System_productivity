import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSchemeMaintenanceComponent } from './current-scheme-maintenance.component';

describe('CurrentSchemeMaintenanceComponent', () => {
  let component: CurrentSchemeMaintenanceComponent;
  let fixture: ComponentFixture<CurrentSchemeMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSchemeMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSchemeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
