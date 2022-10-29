import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBoookroomComponent } from './client-boookroom.component';

describe('ClientBoookroomComponent', () => {
  let component: ClientBoookroomComponent;
  let fixture: ComponentFixture<ClientBoookroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBoookroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBoookroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
