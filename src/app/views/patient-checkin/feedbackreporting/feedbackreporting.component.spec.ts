import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackreportingComponent } from './feedbackreporting.component';

describe('FeedbackreportingComponent', () => {
  let component: FeedbackreportingComponent;
  let fixture: ComponentFixture<FeedbackreportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackreportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
