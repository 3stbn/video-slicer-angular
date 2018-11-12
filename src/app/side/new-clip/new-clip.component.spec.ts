import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClipComponent } from './new-clip.component';

describe('NewClipComponent', () => {
  let component: NewClipComponent;
  let fixture: ComponentFixture<NewClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
