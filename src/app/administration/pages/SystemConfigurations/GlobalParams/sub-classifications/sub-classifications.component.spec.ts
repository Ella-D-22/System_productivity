import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClassificationsComponent } from './sub-classifications.component';

describe('SubClassificationsComponent', () => {
  let component: SubClassificationsComponent;
  let fixture: ComponentFixture<SubClassificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubClassificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
