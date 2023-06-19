import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupdrugsComponent } from './setupdrugs.component';

describe('SetupdrugsComponent', () => {
  let component: SetupdrugsComponent;
  let fixture: ComponentFixture<SetupdrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupdrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupdrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
