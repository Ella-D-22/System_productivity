import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HbivsmComponent } from './hbivsm.component';

describe('HbivsmComponent', () => {
  let component: HbivsmComponent;
  let fixture: ComponentFixture<HbivsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HbivsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HbivsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
