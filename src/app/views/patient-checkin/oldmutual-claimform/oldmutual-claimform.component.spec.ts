import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldmutualClaimformComponent } from './oldmutual-claimform.component';

describe('OldmutualClaimformComponent', () => {
  let component: OldmutualClaimformComponent;
  let fixture: ComponentFixture<OldmutualClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldmutualClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldmutualClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
