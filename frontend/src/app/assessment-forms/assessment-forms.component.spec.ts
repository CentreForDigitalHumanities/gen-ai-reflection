import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AssessmentFormsComponent } from "./assessment-forms.component";
import { ApiService } from "../services/api.service";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavButtonsComponent } from "../nav-buttons/nav-buttons.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { signal } from "@angular/core";
import { AssessmentForm, Challenges, Opportunities } from "../../types";
import { provideRouter, RouterLink } from "@angular/router";

const mockAssessmentForms: AssessmentForm[] = [
    {
        id: "form1",
        name: "Form 1",
        aiUses: [
            {
                id: "aiUse1",
                name: "AI Use 1",
                examples: ["Example 1", "Example 2"],
            },
            {
                id: "aiUse2",
                name: "AI Use 2",
                examples: ["Example 3", "Example 4"],
            },
        ],
        iloWithAlternatives: [
            {
                id: "ilo1",
                intendedOutcome: "Intended Outcome 1",
                alternatives: ["Alternative 1", "Alternative 2"],
            },
        ],
    },
];

describe("AssessmentFormsComponent", () => {
    let component: AssessmentFormsComponent;
    let fixture: ComponentFixture<AssessmentFormsComponent>;
    let formService: FormService;

    const mockApiService = {
        serverData: {
            value: signal({
                challenges: {} as Challenges,
                opportunities: {} as Opportunities,
                assessmentForms: mockAssessmentForms,
            }),
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AssessmentFormsComponent,
                CommonModule,
                ReactiveFormsModule,
                NavButtonsComponent,
                NoopAnimationsModule,
            ],
            providers: [
                FormService,
                { provide: ApiService, useValue: mockApiService },
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AssessmentFormsComponent);
        component = fixture.componentInstance;
        formService = TestBed.inject(FormService);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should load assessment form options on init", () => {
        expect(component.assessmentFormOptions().length).toBe(
            mockAssessmentForms.length
        );
        expect(component.assessmentFormOptions()[0].name).toBe(
            mockAssessmentForms[0].name
        );
    });

    it("should update aiUseOptions when assessmentForm changes", () => {
        const assessmentFormId = mockAssessmentForms[0].id;
        formService.form.controls.assessmentForm.setValue(assessmentFormId);
        fixture.detectChanges();

        expect(component.aiUseOptions().length).toBe(
            mockAssessmentForms[0].aiUses.length
        );
        expect(component.aiUseOptions()[0].name).toBe(
            mockAssessmentForms[0].aiUses[0].name
        );
    });

    it("should update exampleOptions when aiUse changes", () => {
        const assessmentFormId = mockAssessmentForms[0].id;
        const aiUseId = mockAssessmentForms[0].aiUses[0].id;

        formService.form.controls.assessmentForm.setValue(assessmentFormId);
        fixture.detectChanges();

        formService.form.controls.aiUse.setValue(aiUseId);
        fixture.detectChanges();

        expect(component.exampleOptions().length).toBe(
            mockAssessmentForms[0].aiUses[0].examples.length
        );
        expect(component.exampleOptions()[0]).toBe(
            mockAssessmentForms[0].aiUses[0].examples[0]
        );
    });

    it("should update the form when selectAiUse is called", () => {
        const aiUseId = mockAssessmentForms[0].aiUses[0].id;
        component.selectAiUse(aiUseId);
        expect(formService.form.controls.aiUse.value).toBe(aiUseId);
    });
});
