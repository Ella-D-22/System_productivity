import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtvsmLookUpComponent } from './htvsm-look-up.component';

describe('HtvsmLookUpComponent', () => {
  let component: HtvsmLookUpComponent;
  let fixture: ComponentFixture<HtvsmLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtvsmLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtvsmLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
