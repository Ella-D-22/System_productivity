import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLookupComponent } from './report-lookup.component';

describe('ReportLookupComponent', () => {
  let component: ReportLookupComponent;
  let fixture: ComponentFixture<ReportLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
