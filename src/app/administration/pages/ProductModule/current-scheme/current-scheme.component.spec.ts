import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSchemeComponent } from './current-scheme.component';

describe('CurrentSchemeComponent', () => {
  let component: CurrentSchemeComponent;
  let fixture: ComponentFixture<CurrentSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
