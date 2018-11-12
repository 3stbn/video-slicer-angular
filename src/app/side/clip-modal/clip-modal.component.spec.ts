import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipModalComponent } from './clip-modal.component';

describe('ClipModalComponent', () => {
  let component: ClipModalComponent;
  let fixture: ComponentFixture<ClipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
