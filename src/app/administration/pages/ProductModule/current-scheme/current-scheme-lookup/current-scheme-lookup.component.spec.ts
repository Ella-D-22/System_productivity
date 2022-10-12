import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSchemeLookupComponent } from './current-scheme-lookup.component';

describe('CurrentSchemeLookupComponent', () => {
  let component: CurrentSchemeLookupComponent;
  let fixture: ComponentFixture<CurrentSchemeLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSchemeLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSchemeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
