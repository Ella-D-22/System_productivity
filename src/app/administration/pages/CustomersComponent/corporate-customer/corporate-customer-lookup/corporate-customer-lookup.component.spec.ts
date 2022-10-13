import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCustomerLookupComponent } from './corporate-customer-lookup.component';

describe('CorporateCustomerLookupComponent', () => {
  let component: CorporateCustomerLookupComponent;
  let fixture: ComponentFixture<CorporateCustomerLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateCustomerLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCustomerLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
