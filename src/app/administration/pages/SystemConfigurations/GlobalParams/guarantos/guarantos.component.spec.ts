import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantosComponent } from './guarantos.component';

describe('GuarantosComponent', () => {
  let component: GuarantosComponent;
  let fixture: ComponentFixture<GuarantosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
