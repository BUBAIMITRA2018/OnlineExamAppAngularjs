import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionfromComponent } from './questionfrom.component';

describe('QuestionfromComponent', () => {
  let component: QuestionfromComponent;
  let fixture: ComponentFixture<QuestionfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionfromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
