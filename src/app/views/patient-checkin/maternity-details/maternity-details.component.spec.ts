import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityDetailsComponent } from './maternity-details.component';

describe('MaternityDetailsComponent', () => {
  let component: MaternityDetailsComponent;
  let fixture: ComponentFixture<MaternityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
