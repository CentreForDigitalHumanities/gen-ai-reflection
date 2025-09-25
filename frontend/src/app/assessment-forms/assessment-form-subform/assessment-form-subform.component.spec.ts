import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFormSubformComponent } from './assessment-form-subform.component';

describe('AssessmentFormSubformComponent', () => {
    let component: AssessmentFormSubformComponent;
    let fixture: ComponentFixture<AssessmentFormSubformComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AssessmentFormSubformComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AssessmentFormSubformComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
