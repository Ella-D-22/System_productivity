import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamAddComponent } from './param-add.component';

describe('ParamAddComponent', () => {
  let component: ParamAddComponent;
  let fixture: ComponentFixture<ParamAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
