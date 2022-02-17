import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInsuranceFormsComponent } from './print-insurance-forms.component';

describe('PrintInsuranceFormsComponent', () => {
  let component: PrintInsuranceFormsComponent;
  let fixture: ComponentFixture<PrintInsuranceFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintInsuranceFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInsuranceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
