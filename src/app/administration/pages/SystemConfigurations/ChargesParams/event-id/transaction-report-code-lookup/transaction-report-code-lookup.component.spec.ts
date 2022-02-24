import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReportCodeLookupComponent } from './transaction-report-code-lookup.component';

describe('TransactionReportCodeLookupComponent', () => {
  let component: TransactionReportCodeLookupComponent;
  let fixture: ComponentFixture<TransactionReportCodeLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionReportCodeLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionReportCodeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
