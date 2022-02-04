import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApaClaimformComponent } from './apa-claimform.component';

describe('ApaClaimformComponent', () => {
  let component: ApaClaimformComponent;
  let fixture: ComponentFixture<ApaClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApaClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApaClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
