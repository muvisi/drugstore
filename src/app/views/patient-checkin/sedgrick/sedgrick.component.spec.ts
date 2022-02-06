import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedgrickComponent } from './sedgrick.component';

describe('SedgrickComponent', () => {
  let component: SedgrickComponent;
  let fixture: ComponentFixture<SedgrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedgrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedgrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
