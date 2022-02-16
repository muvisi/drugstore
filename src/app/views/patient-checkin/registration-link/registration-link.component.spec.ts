import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationLinkComponent } from './registration-link.component';

describe('RegistrationLinkComponent', () => {
  let component: RegistrationLinkComponent;
  let fixture: ComponentFixture<RegistrationLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
