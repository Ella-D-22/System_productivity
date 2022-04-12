import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesLookupComponent } from './countries-lookup.component';

describe('CountriesLookupComponent', () => {
  let component: CountriesLookupComponent;
  let fixture: ComponentFixture<CountriesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
