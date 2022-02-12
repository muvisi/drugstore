import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BupaclobalClaimformComponent } from './bupaclobal-claimform.component';

describe('BupaclobalClaimformComponent', () => {
  let component: BupaclobalClaimformComponent;
  let fixture: ComponentFixture<BupaclobalClaimformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BupaclobalClaimformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BupaclobalClaimformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
