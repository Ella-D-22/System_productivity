import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainKycComponent } from './main-kyc.component';

describe('MainKycComponent', () => {
  let component: MainKycComponent;
  let fixture: ComponentFixture<MainKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
