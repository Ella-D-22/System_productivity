import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantosMaintenanceComponent } from './guarantos-maintenance.component';

describe('GuarantosMaintenanceComponent', () => {
  let component: GuarantosMaintenanceComponent;
  let fixture: ComponentFixture<GuarantosMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantosMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantosMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
