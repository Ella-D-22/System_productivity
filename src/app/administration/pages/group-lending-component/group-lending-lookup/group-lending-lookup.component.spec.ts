import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLendingLookupComponent } from './group-lending-lookup.component';

describe('GroupLendingLookupComponent', () => {
  let component: GroupLendingLookupComponent;
  let fixture: ComponentFixture<GroupLendingLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLendingLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLendingLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
