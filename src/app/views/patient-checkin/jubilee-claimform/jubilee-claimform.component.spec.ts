import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JubileeClaimformComponent } from './jubilee-claimform.component';

describe('JubileeClaimformComponent', () => {
  let component: JubileeClaimformComponent;
  let fixture: ComponentFixture<JubileeClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JubileeClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JubileeClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
