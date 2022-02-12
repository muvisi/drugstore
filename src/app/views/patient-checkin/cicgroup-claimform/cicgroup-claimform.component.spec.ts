import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicgroupClaimformComponent } from './cicgroup-claimform.component';

describe('CicgroupClaimformComponent', () => {
  let component: CicgroupClaimformComponent;
  let fixture: ComponentFixture<CicgroupClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicgroupClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicgroupClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
