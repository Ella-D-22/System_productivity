import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitMemberComponent } from './exit-member.component';

describe('ExitMemberComponent', () => {
  let component: ExitMemberComponent;
  let fixture: ComponentFixture<ExitMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
