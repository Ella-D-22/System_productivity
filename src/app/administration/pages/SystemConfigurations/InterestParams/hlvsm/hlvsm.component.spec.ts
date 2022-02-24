import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HlvsmComponent } from './hlvsm.component';

describe('HlvsmComponent', () => {
  let component: HlvsmComponent;
  let fixture: ComponentFixture<HlvsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HlvsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HlvsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
