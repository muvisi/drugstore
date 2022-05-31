import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootwalkComponent } from './footwalk.component';

describe('FootwalkComponent', () => {
  let component: FootwalkComponent;
  let fixture: ComponentFixture<FootwalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootwalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootwalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
