import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AarClaimformComponent } from './aar-claimform.component';

describe('AarClaimformComponent', () => {
  let component: AarClaimformComponent;
  let fixture: ComponentFixture<AarClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AarClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AarClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
