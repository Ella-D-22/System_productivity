import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestLookupComponent } from './interest-lookup.component';

describe('InterestLookupComponent', () => {
  let component: InterestLookupComponent;
  let fixture: ComponentFixture<InterestLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
