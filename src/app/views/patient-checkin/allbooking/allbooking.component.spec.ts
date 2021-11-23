import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbookingComponent } from './allbooking.component';

describe('AllbookingComponent', () => {
  let component: AllbookingComponent;
  let fixture: ComponentFixture<AllbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
