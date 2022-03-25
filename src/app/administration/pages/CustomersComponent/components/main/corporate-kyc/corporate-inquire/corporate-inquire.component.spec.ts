import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateInquireComponent } from './corporate-inquire.component';

describe('CorporateInquireComponent', () => {
  let component: CorporateInquireComponent;
  let fixture: ComponentFixture<CorporateInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateInquireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
