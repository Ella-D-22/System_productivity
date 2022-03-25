import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateModifyComponent } from './corporate-modify.component';

describe('CorporateModifyComponent', () => {
  let component: CorporateModifyComponent;
  let fixture: ComponentFixture<CorporateModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
