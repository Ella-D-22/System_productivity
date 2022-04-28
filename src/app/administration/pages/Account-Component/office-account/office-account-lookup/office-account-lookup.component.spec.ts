import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAccountLookupComponent } from './office-account-lookup.component';

describe('OfficeAccountLookupComponent', () => {
  let component: OfficeAccountLookupComponent;
  let fixture: ComponentFixture<OfficeAccountLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeAccountLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAccountLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
