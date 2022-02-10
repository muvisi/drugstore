import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTNClaimformComponent } from './mtn-claimform.component';

describe('MTNClaimformComponent', () => {
  let component: MTNClaimformComponent;
  let fixture: ComponentFixture<MTNClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTNClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTNClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
