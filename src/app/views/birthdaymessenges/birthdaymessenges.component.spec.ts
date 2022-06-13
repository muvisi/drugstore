import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdaymessengesComponent } from './birthdaymessenges.component';

describe('BirthdaymessengesComponent', () => {
  let component: BirthdaymessengesComponent;
  let fixture: ComponentFixture<BirthdaymessengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdaymessengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdaymessengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
