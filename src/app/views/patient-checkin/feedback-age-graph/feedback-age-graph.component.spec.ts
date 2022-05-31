import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAgeGraphComponent } from './feedback-age-graph.component';

describe('FeedbackAgeGraphComponent', () => {
  let component: FeedbackAgeGraphComponent;
  let fixture: ComponentFixture<FeedbackAgeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAgeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAgeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
