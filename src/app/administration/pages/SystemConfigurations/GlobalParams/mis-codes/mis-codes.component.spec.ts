import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCodesComponent } from './mis-codes.component';

describe('MisCodesComponent', () => {
  let component: MisCodesComponent;
  let fixture: ComponentFixture<MisCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
