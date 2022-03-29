import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsLookupComponent } from './limits-lookup.component';

describe('LimitsLookupComponent', () => {
  let component: LimitsLookupComponent;
  let fixture: ComponentFixture<LimitsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
