import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailInquireComponent } from './retail-inquire.component';

describe('RetailInquireComponent', () => {
  let component: RetailInquireComponent;
  let fixture: ComponentFixture<RetailInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailInquireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
