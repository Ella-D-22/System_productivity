import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamMainComponent } from './param-main.component';

describe('ParamMainComponent', () => {
  let component: ParamMainComponent;
  let fixture: ComponentFixture<ParamMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
