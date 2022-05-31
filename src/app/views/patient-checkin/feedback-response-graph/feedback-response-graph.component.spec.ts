import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackResponseGraphComponent } from './feedback-response-graph.component';

describe('FeedbackResponseGraphComponent', () => {
  let component: FeedbackResponseGraphComponent;
  let fixture: ComponentFixture<FeedbackResponseGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackResponseGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackResponseGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
