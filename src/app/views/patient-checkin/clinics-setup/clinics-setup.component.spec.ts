import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsSetupComponent } from './clinics-setup.component';

describe('FeedbackSetupComponent', () => {
  let component: ClinicsSetupComponent;
  let fixture: ComponentFixture<ClinicsSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicsSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
