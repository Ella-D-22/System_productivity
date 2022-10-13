import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanproductComponent } from './loanproduct.component';

describe('LoanproductComponent', () => {
  let component: LoanproductComponent;
  let fixture: ComponentFixture<LoanproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
