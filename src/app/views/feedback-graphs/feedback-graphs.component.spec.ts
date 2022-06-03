import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackGraphsComponent } from './feedback-graphs.component';

describe('FeedbackGraphsComponent', () => {
  let component: FeedbackGraphsComponent;
  let fixture: ComponentFixture<FeedbackGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
