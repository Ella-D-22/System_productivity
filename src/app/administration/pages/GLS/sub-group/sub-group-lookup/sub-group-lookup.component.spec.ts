import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupLookupComponent } from './sub-group-lookup.component';

describe('SubGroupLookupComponent', () => {
  let component: SubGroupLookupComponent;
  let fixture: ComponentFixture<SubGroupLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
