import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsuploadsComponent } from './patientsuploads.component';

describe('PatientsuploadsComponent', () => {
  let component: PatientsuploadsComponent;
  let fixture: ComponentFixture<PatientsuploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsuploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
