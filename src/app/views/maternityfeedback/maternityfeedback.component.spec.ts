import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityfeedbackComponent } from './maternityfeedback.component';

describe('MaternityfeedbackComponent', () => {
  let component: MaternityfeedbackComponent;
  let fixture: ComponentFixture<MaternityfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

