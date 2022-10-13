import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlSubheadLookup2Component } from './gl-subhead.component';

describe('GlSubheadComponent', () => {
  let component: GlSubheadLookup2Component;
  let fixture: ComponentFixture<GlSubheadLookup2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlSubheadLookup2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlSubheadLookup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
