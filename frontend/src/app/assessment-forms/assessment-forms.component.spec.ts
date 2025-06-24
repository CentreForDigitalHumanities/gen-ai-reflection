import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssessmentFormsComponent } from "./assessment-forms.component";

describe("AssessmentFormsComponent", () => {
    let component: AssessmentFormsComponent;
    let fixture: ComponentFixture<AssessmentFormsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AssessmentFormsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AssessmentFormsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
