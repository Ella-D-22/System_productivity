import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAccountsLookupComponent } from './office-accounts-lookup.component';

describe('OfficeAccountsLookupComponent', () => {
  let component: OfficeAccountsLookupComponent;
  let fixture: ComponentFixture<OfficeAccountsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeAccountsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAccountsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
