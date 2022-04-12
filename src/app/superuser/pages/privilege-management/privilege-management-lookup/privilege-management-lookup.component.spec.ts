import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeManagementLookupComponent } from './privilege-management-lookup.component';

describe('PrivilegeManagementLookupComponent', () => {
  let component: PrivilegeManagementLookupComponent;
  let fixture: ComponentFixture<PrivilegeManagementLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilegeManagementLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeManagementLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
