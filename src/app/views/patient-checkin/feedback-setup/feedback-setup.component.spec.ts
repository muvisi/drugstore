import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSetupComponent } from './feedback-setup.component';

describe('FeedbackSetupComponent', () => {
  let component: FeedbackSetupComponent;
  let fixture: ComponentFixture<FeedbackSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
