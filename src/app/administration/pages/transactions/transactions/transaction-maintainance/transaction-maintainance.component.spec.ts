import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMaintainanceComponent } from './transaction-maintainance.component';

describe('TransactionMaintainanceComponent', () => {
  let component: TransactionMaintainanceComponent;
  let fixture: ComponentFixture<TransactionMaintainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMaintainanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
