import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGroupLookupComponent } from './main-group-lookup.component';

describe('MainGroupLookupComponent', () => {
  let component: MainGroupLookupComponent;
  let fixture: ComponentFixture<MainGroupLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGroupLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGroupLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
