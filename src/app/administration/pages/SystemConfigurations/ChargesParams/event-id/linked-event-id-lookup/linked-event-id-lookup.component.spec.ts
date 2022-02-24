import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedEventIdLookupComponent } from './linked-event-id-lookup.component';

describe('LinkedEventIdLookupComponent', () => {
  let component: LinkedEventIdLookupComponent;
  let fixture: ComponentFixture<LinkedEventIdLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedEventIdLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedEventIdLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
