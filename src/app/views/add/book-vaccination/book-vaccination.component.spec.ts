import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVaccinationComponent } from './book-vaccination.component';

describe('BookVaccinationComponent', () => {
  let component: BookVaccinationComponent;
  let fixture: ComponentFixture<BookVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
