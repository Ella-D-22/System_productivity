import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailDeleteComponent } from './retail-delete.component';

describe('RetailDeleteComponent', () => {
  let component: RetailDeleteComponent;
  let fixture: ComponentFixture<RetailDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
