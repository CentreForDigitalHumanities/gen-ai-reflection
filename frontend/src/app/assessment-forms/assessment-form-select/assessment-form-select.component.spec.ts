import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFormSelectComponent } from './assessment-form-select.component';

describe('AssessmentFormSelectComponent', () => {
  let component: AssessmentFormSelectComponent;
  let fixture: ComponentFixture<AssessmentFormSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentFormSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
