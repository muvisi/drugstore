import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMaternityComponent } from './book-maternity.component';

describe('BookMaternityComponent', () => {
  let component: BookMaternityComponent;
  let fixture: ComponentFixture<BookMaternityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMaternityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMaternityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
