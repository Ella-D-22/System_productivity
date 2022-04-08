import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeManagementComponent } from './privilege-management.component';

describe('PrivilegeManagementComponent', () => {
  let component: PrivilegeManagementComponent;
  let fixture: ComponentFixture<PrivilegeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilegeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
