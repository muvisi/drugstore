import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritageClaimformComponent } from './heritage-claimform.component';

describe('HeritageClaimformComponent', () => {
  let component: HeritageClaimformComponent;
  let fixture: ComponentFixture<HeritageClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeritageClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeritageClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
