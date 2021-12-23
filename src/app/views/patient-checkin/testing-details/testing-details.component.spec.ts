import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDetailsComponent } from './testing-details.component';

describe('TestingDetailsComponent', () => {
  let component: TestingDetailsComponent;
  let fixture: ComponentFixture<TestingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
