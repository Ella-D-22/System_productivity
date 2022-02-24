import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitcmLookUpComponent } from './hitcm-look-up.component';

describe('HitcmLookUpComponent', () => {
  let component: HitcmLookUpComponent;
  let fixture: ComponentFixture<HitcmLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitcmLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitcmLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
