import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuelistComponent } from './queuelist.component';

describe('QueuelistComponent', () => {
  let component: QueuelistComponent;
  let fixture: ComponentFixture<QueuelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
