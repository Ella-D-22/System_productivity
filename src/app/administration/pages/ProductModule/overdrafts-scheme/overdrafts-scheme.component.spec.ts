import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftsSchemeComponent } from './overdrafts-scheme.component';

describe('OverdraftsSchemeComponent', () => {
  let component: OverdraftsSchemeComponent;
  let fixture: ComponentFixture<OverdraftsSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftsSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdraftsSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
