import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityQrcodeComponent } from './maternity-qrcode.component';

describe('MaternityQrcodeComponent', () => {
  let component: MaternityQrcodeComponent;
  let fixture: ComponentFixture<MaternityQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
