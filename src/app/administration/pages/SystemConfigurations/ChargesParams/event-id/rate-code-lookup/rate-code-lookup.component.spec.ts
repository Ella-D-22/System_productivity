import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCodeLookupComponent } from './rate-code-lookup.component';

describe('RateCodeLookupComponent', () => {
  let component: RateCodeLookupComponent;
  let fixture: ComponentFixture<RateCodeLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateCodeLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCodeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
