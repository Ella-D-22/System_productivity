import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingschemeLookupComponent } from './savingscheme-lookup.component';

describe('SavingschemeLookupComponent', () => {
  let component: SavingschemeLookupComponent;
  let fixture: ComponentFixture<SavingschemeLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingschemeLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingschemeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
