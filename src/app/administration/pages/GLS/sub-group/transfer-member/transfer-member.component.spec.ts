import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMemberComponent } from './transfer-member.component';

describe('TransferMemberComponent', () => {
  let component: TransferMemberComponent;
  let fixture: ComponentFixture<TransferMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
