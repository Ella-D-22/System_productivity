import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsModuleComponent } from './accounts-module.component';

describe('AccountsModuleComponent', () => {
  let component: AccountsModuleComponent;
  let fixture: ComponentFixture<AccountsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
