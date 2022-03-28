import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaPaymentReportComponent } from './mpesa-payment-report.component';

describe('MpesaPaymentReportComponent', () => {
  let component: MpesaPaymentReportComponent;
  let fixture: ComponentFixture<MpesaPaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpesaPaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpesaPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
