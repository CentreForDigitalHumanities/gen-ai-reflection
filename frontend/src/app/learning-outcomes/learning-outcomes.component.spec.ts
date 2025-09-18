import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LearningOutcomesComponent } from "./learning-outcomes.component";
import { provideRouter } from "@angular/router";
import { signal } from "@angular/core";
import { ApiResponse, Challenges, Opportunities } from "../shared/types";
import { ApiService } from "../services/api.service";
import { FormService } from "../services/form.service";

describe("LearningOutcomesComponent", () => {
    let component: LearningOutcomesComponent;
    let fixture: ComponentFixture<LearningOutcomesComponent>;

    const mockApiService = {
        serverData: {
            value: signal<ApiResponse>({
                challenges: {} as Challenges,
                opportunities: {} as Opportunities,
                assessmentForms: [],
                aiUseExamples: []
            }),
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LearningOutcomesComponent],
            providers: [
                FormService,
                { provide: ApiService, useValue: mockApiService },
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LearningOutcomesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
