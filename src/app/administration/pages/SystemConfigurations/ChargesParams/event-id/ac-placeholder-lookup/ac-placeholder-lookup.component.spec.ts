import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcPlaceholderLookupComponent } from './ac-placeholder-lookup.component';

describe('AcPlaceholderLookupComponent', () => {
  let component: AcPlaceholderLookupComponent;
  let fixture: ComponentFixture<AcPlaceholderLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcPlaceholderLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcPlaceholderLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
