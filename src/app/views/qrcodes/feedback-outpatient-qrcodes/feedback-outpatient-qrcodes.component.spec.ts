import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackOutpatientQrcodesComponent } from './feedback-outpatient-qrcodes.component';

describe('FeedbackOutpatientQrcodesComponent', () => {
  let component: FeedbackOutpatientQrcodesComponent;
  let fixture: ComponentFixture<FeedbackOutpatientQrcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackOutpatientQrcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackOutpatientQrcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
