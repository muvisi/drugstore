import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificClinicsetupComponent } from './specific-clinicsetup.component';

describe('SpecificClinicsetupComponent', () => {
  let component: SpecificClinicsetupComponent;
  let fixture: ComponentFixture<SpecificClinicsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificClinicsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificClinicsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
