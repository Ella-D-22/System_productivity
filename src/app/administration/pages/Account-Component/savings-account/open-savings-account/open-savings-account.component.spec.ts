import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSavingsAccountComponent } from './open-savings-account.component';

describe('OpenSavingsAccountComponent', () => {
  let component: OpenSavingsAccountComponent;
  let fixture: ComponentFixture<OpenSavingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSavingsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
