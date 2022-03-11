import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInpatientQrcodesComponent } from './feedback-inpatient-qrcodes.component';

describe('FeedbackInpatientQrcodesComponent', () => {
  let component: FeedbackInpatientQrcodesComponent;
  let fixture: ComponentFixture<FeedbackInpatientQrcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackInpatientQrcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackInpatientQrcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
