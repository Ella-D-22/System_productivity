import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailCustomerLookupComponent } from './retail-customer-lookup.component';

describe('RetailCustomerLookupComponent', () => {
  let component: RetailCustomerLookupComponent;
  let fixture: ComponentFixture<RetailCustomerLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailCustomerLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailCustomerLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
