import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAddComponent } from './corporate-add.component';

describe('CorporateAddComponent', () => {
  let component: CorporateAddComponent;
  let fixture: ComponentFixture<CorporateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
