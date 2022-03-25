import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityListComponent } from './maternity-list.component';

describe('MaternityListComponent', () => {
  let component: MaternityListComponent;
  let fixture: ComponentFixture<MaternityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
