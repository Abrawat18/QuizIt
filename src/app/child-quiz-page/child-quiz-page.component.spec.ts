import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildQuizPageComponent } from './child-quiz-page.component';

describe('ChildQuizPageComponent', () => {
  let component: ChildQuizPageComponent;
  let fixture: ComponentFixture<ChildQuizPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildQuizPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
