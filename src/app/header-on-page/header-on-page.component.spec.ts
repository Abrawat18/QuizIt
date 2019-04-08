import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOnPageComponent } from './header-on-page.component';

describe('HeaderOnPageComponent', () => {
  let component: HeaderOnPageComponent;
  let fixture: ComponentFixture<HeaderOnPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOnPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
