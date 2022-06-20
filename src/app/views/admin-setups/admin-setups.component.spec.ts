import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetupsComponent } from './admin-setups.component';

describe('AdminSetupsComponent', () => {
  let component: AdminSetupsComponent;
  let fixture: ComponentFixture<AdminSetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
