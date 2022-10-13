import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsMaintenanceComponent } from './accounts-maintenance.component';

describe('AccountsMaintenanceComponent', () => {
  let component: AccountsMaintenanceComponent;
  let fixture: ComponentFixture<AccountsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
