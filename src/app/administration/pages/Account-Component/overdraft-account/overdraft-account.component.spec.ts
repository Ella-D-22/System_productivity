import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftAccountComponent } from './overdraft-account.component';

describe('OverdraftAccountComponent', () => {
  let component: OverdraftAccountComponent;
  let fixture: ComponentFixture<OverdraftAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdraftAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
