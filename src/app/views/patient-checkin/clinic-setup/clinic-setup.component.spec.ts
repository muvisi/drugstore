import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSetupComponent } from './clinic-setup.component';

describe('ClinicSetupComponent', () => {
  let component: ClinicSetupComponent;
  let fixture: ComponentFixture<ClinicSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
