import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTransBusinessLookupComponent } from './part-trans-business-lookup.component';

describe('PartTransBusinessLookupComponent', () => {
  let component: PartTransBusinessLookupComponent;
  let fixture: ComponentFixture<PartTransBusinessLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartTransBusinessLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTransBusinessLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
