import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HlvsmLookUpComponent } from './hlvsm-look-up.component';

describe('HlvsmLookUpComponent', () => {
  let component: HlvsmLookUpComponent;
  let fixture: ComponentFixture<HlvsmLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HlvsmLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HlvsmLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
