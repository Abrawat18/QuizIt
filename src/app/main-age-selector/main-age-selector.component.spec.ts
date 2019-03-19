import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAgeSelectorComponent } from './main-age-selector.component';

describe('MainAgeSelectorComponent', () => {
  let component: MainAgeSelectorComponent;
  let fixture: ComponentFixture<MainAgeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAgeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAgeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
