import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PexperienceComponent } from './pexperience.component';

describe('PexperienceComponent', () => {
  let component: PexperienceComponent;
  let fixture: ComponentFixture<PexperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PexperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
