import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmaternityComponent } from './viewmaternity.component';

describe('ViewmaternityComponent', () => {
  let component: ViewmaternityComponent;
  let fixture: ComponentFixture<ViewmaternityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmaternityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmaternityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
