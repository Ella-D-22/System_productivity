import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtvsmComponent } from './htvsm.component';

describe('HtvsmComponent', () => {
  let component: HtvsmComponent;
  let fixture: ComponentFixture<HtvsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtvsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtvsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
