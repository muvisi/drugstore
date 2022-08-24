import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityCalendarComponent } from './maternity-calendar.component';

describe('MaternityCalendarComponent', () => {
  let component: MaternityCalendarComponent;
  let fixture: ComponentFixture<MaternityCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
