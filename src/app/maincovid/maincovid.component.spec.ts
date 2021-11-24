import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincovidComponent } from './maincovid.component';

describe('MaincovidComponent', () => {
  let component: MaincovidComponent;
  let fixture: ComponentFixture<MaincovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
