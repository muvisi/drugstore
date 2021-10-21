import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureCheckComponent } from './insure-check.component';

describe('InsureCheckComponent', () => {
  let component: InsureCheckComponent;
  let fixture: ComponentFixture<InsureCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
