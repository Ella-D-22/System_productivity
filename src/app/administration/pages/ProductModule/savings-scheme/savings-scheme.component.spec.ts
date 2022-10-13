import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsSchemeComponent } from './savings-scheme.component';

describe('SavingsSchemeComponent', () => {
  let component: SavingsSchemeComponent;
  let fixture: ComponentFixture<SavingsSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
