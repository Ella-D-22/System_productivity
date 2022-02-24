import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HbivsmLookUpComponent } from './hbivsm-look-up.component';

describe('HbivsmLookUpComponent', () => {
  let component: HbivsmLookUpComponent;
  let fixture: ComponentFixture<HbivsmLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HbivsmLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HbivsmLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
