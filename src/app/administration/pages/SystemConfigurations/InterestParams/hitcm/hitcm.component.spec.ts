import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitcmComponent } from './hitcm.component';

describe('HitcmComponent', () => {
  let component: HitcmComponent;
  let fixture: ComponentFixture<HitcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitcmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
