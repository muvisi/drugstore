import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstassuranceComponent } from './firstassurance.component';

describe('FirstassuranceComponent', () => {
  let component: FirstassuranceComponent;
  let fixture: ComponentFixture<FirstassuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstassuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstassuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
