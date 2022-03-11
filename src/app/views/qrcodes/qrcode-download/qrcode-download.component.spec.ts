import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDownloadComponent } from './qrcode-download.component';

describe('QrcodeDownloadComponent', () => {
  let component: QrcodeDownloadComponent;
  let fixture: ComponentFixture<QrcodeDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
