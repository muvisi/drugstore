import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinetClaimformsComponent } from './minet-claimforms.component';

describe('MinetClaimformsComponent', () => {
  let component: MinetClaimformsComponent;
  let fixture: ComponentFixture<MinetClaimformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinetClaimformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinetClaimformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
