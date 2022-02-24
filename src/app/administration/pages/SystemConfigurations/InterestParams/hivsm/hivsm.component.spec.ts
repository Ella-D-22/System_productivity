import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivsmComponent } from './hivsm.component';

describe('HivsmComponent', () => {
  let component: HivsmComponent;
  let fixture: ComponentFixture<HivsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HivsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
