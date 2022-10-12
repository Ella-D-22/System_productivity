import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAccountLookupComponent } from './current-account-lookup.component';

describe('CurrentAccountLookupComponent', () => {
  let component: CurrentAccountLookupComponent;
  let fixture: ComponentFixture<CurrentAccountLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAccountLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAccountLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
