import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailCustomerComponent } from './retail-customer.component';

describe('RetailCustomerComponent', () => {
  let component: RetailCustomerComponent;
  let fixture: ComponentFixture<RetailCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
