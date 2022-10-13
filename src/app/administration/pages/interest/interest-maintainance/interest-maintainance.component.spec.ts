import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestMaintainanceComponent } from './interest-maintainance.component';

describe('InterestMaintainanceComponent', () => {
  let component: InterestMaintainanceComponent;
  let fixture: ComponentFixture<InterestMaintainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestMaintainanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestMaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
