import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailAddComponent } from './retail-add.component';

describe('RetailAddComponent', () => {
  let component: RetailAddComponent;
  let fixture: ComponentFixture<RetailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
