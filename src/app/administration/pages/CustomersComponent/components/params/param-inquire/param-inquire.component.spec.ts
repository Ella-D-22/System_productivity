import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamInquireComponent } from './param-inquire.component';

describe('ParamInquireComponent', () => {
  let component: ParamInquireComponent;
  let fixture: ComponentFixture<ParamInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamInquireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
