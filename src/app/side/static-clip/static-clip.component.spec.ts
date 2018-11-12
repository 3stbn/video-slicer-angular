import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticClipComponent } from './static-clip.component';

describe('StaticClipComponent', () => {
  let component: StaticClipComponent;
  let fixture: ComponentFixture<StaticClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
