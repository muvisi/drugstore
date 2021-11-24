import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinereportsComponent } from './onlinereports.component';

describe('OnlinereportsComponent', () => {
  let component: OnlinereportsComponent;
  let fixture: ComponentFixture<OnlinereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
