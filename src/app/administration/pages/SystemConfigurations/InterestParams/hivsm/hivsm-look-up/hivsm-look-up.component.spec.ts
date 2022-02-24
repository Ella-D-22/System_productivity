import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivsmLookUpComponent } from './hivsm-look-up.component';

describe('HivsmLookUpComponent', () => {
  let component: HivsmLookUpComponent;
  let fixture: ComponentFixture<HivsmLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivsmLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HivsmLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
