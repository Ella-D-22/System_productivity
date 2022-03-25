import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailModifyComponent } from './retail-modify.component';

describe('RetailModifyComponent', () => {
  let component: RetailModifyComponent;
  let fixture: ComponentFixture<RetailModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
