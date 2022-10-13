import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassificationLookupComponent } from './sub-classification-lookup.component';

describe('SubClassificationLookupComponent', () => {
  let component: SubClassificationLookupComponent;
  let fixture: ComponentFixture<SubClassificationLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubClassificationLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassificationLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
