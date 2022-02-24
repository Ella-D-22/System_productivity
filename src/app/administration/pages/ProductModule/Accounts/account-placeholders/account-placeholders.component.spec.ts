import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPlaceholdersComponent } from './account-placeholders.component';

describe('AccountPlaceholdersComponent', () => {
  let component: AccountPlaceholdersComponent;
  let fixture: ComponentFixture<AccountPlaceholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPlaceholdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPlaceholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
