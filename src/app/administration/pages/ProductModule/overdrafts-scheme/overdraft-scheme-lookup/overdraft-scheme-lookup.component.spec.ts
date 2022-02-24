import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftSchemeLookupComponent } from './overdraft-scheme-lookup.component';

describe('OverdraftSchemeLookupComponent', () => {
  let component: OverdraftSchemeLookupComponent;
  let fixture: ComponentFixture<OverdraftSchemeLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftSchemeLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdraftSchemeLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
