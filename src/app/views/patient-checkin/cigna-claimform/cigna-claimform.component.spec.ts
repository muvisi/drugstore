import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CignaClaimformComponent } from './cigna-claimform.component';

describe('CignaClaimformComponent', () => {
  let component: CignaClaimformComponent;
  let fixture: ComponentFixture<CignaClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CignaClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CignaClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
