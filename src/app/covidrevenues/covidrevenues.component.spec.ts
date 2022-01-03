import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidrevenuesComponent } from './covidrevenues.component';

describe('CovidrevenuesComponent', () => {
  let component: CovidrevenuesComponent;
  let fixture: ComponentFixture<CovidrevenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidrevenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidrevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
