import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsissueComponent } from './drugsissue.component';

describe('DrugsissueComponent', () => {
  let component: DrugsissueComponent;
  let fixture: ComponentFixture<DrugsissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
