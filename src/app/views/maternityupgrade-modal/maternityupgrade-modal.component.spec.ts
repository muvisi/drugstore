import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityupgradeModalComponent } from './maternityupgrade-modal.component';

describe('MaternityupgradeModalComponent', () => {
  let component: MaternityupgradeModalComponent;
  let fixture: ComponentFixture<MaternityupgradeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityupgradeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityupgradeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
