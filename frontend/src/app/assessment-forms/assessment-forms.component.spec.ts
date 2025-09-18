import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AssessmentFormsComponent } from "./assessment-forms.component";
import { ApiService } from "../services/api.service";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavButtonsComponent } from "../nav-buttons/nav-buttons.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { signal } from "@angular/core";
import { ApiResponse, AssessmentForm, Challenges, Opportunities } from "../shared/types";
import { provideRouter } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const mockAssessmentForms: AssessmentForm[] = [
    {
        id: 1,
        name: "Individual Paper/thesis",
        adjustments: [
            "Add GenAI statement",
            "Add portfolio of workflow",
            "Brainstorming in class, together with peers (e.g., hand in design and stick to it)",
        ]
    },
    {
        id: 2,
        name: "Presentation",
        adjustments: [
            "Stronger focus on Q&A (to test knowledge)",
            "Improvisation element (e.g. analysis of a chart/quote/object that the teacher brings and the students need to relate to the presentation)",
            "Interactive presentations (students need to include audience interaction which requires deeper understanding)",
        ]
    },
    {
        id: 3,
        name: "Group Assignment",
        adjustments: [
            "Individual reflection component",
            "Peer evaluation required",
        ]
    },
];

describe("AssessmentFormsComponent", () => {
    let component: AssessmentFormsComponent;
    let fixture: ComponentFixture<AssessmentFormsComponent>;
    let formService: FormService;

    const mockApiService = {
        serverData: {
            value: signal<ApiResponse>({
                challenges: {} as Challenges,
                opportunities: {} as Opportunities,
                assessmentForms: mockAssessmentForms,
                aiUseExamples: []
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
                FontAwesomeModule,
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
        const options = component['allAssessmentFormOptions']();

        expect(options.length).toBe(
            mockAssessmentForms.length
        );
        expect(options[0].name).toBe(
            mockAssessmentForms[0].name
        );
    });

    describe("availableOptionsFor", () => {
        it("should return all options when no forms are selected", () => {
            const options = component.availableOptionsFor(0);
            expect(options.length).toBe(mockAssessmentForms.length);
        });

        it("should exclude already selected options from other forms", () => {
            // Add two assessment forms
            component.addAssessmentForm();
            component.addAssessmentForm();

            // Set the first form to use assessment "1"
            component.form.controls.assessmentForms.at(0)?.controls.assessmentId.setValue(1);

            // Check that options for second form don't include "1"
            const optionsForSecond = component.availableOptionsFor(1);
            const selectedOption = optionsForSecond.find(opt => opt.id === 1);
            expect(selectedOption).toBeUndefined();
        });

        it("should include current selection in available options", () => {
            component.addAssessmentForm();
            component.form.controls.assessmentForms.at(0)?.controls.assessmentId.setValue(1);

            const options = component.availableOptionsFor(0);
            const currentOption = options.find(opt => opt.id === 1);
            expect(currentOption).toBeTruthy();
        });
    });

    describe("getAdjustments", () => {
        it("should return empty array when assessmentId is null", () => {
            const adjustments = component.getAdjustments(null);
            expect(adjustments).toEqual([]);
        });

        it("should return adjustments for valid assessmentId", () => {
            const adjustments = component.getAdjustments(1);
            expect(adjustments).toEqual(mockAssessmentForms[0].adjustments);
        });

        it("should return empty array for non-existent assessmentId", () => {
            const adjustments = component.getAdjustments(100);
            expect(adjustments).toEqual([]);
        });
    });
});
