import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallPatientsComponent } from './call-patients.component';

describe('CallPatientsComponent', () => {
  let component: CallPatientsComponent;
  let fixture: ComponentFixture<CallPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
