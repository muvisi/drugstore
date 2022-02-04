import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeClaimformComponent } from './cooperative-claimform.component';

describe('CooperativeClaimformComponent', () => {
  let component: CooperativeClaimformComponent;
  let fixture: ComponentFixture<CooperativeClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativeClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperativeClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
