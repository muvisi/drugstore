import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCovidtestingComponent } from './book-covidtesting.component';

describe('BookCovidtestingComponent', () => {
  let component: BookCovidtestingComponent;
  let fixture: ComponentFixture<BookCovidtestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCovidtestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCovidtestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
