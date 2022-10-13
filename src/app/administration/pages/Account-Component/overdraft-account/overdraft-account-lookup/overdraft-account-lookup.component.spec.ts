import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftAccountLookupComponent } from './overdraft-account-lookup.component';

describe('OverdraftAccountLookupComponent', () => {
  let component: OverdraftAccountLookupComponent;
  let fixture: ComponentFixture<OverdraftAccountLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftAccountLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdraftAccountLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
