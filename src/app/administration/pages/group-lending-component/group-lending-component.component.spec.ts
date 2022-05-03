import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLendingComponentComponent } from './group-lending-component.component';

describe('GroupLendingComponentComponent', () => {
  let component: GroupLendingComponentComponent;
  let fixture: ComponentFixture<GroupLendingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLendingComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLendingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
