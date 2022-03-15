import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCodesLookupComponent } from './mis-codes-lookup.component';

describe('MisCodesLookupComponent', () => {
  let component: MisCodesLookupComponent;
  let fixture: ComponentFixture<MisCodesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCodesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCodesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
