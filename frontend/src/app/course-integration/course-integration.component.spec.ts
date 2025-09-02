import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CourseIntegrationComponent } from './course-integration.component';
import { provideRouter } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormService } from '../services/form.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AiAssessmentScaleLevel, ApiResponse } from '../shared/types';
import { resource, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AiScaleSelectComponent } from './ai-scale-select/ai-scale-select.component';

const mockApiData: ApiResponse = {
    aiUseExamples: [
        { id: '1', text: 'Example 1', scaleLevel: AiAssessmentScaleLevel.AI_COLLABORATION },
        { id: '2', text: 'Example 2', scaleLevel: AiAssessmentScaleLevel.AI_PLANNING },
        { id: '3', text: 'Example 3', scaleLevel: AiAssessmentScaleLevel.AI_COLLABORATION },
    ],
    challenges: {
        knowledge_and_understanding: [],
        applying_knowledge_and_understanding: [],
        making_judgements: [],
        communication: [],
        lifelong_learning_skills: [],
    },
    opportunities: {
        knowledge_and_understanding: [],
        applying_knowledge_and_understanding: [],
        making_judgements: [],
        communication: [],
        lifelong_learning_skills: [],
    },
    assessmentForms: [],
};

class MockApiService {
    serverData = {
        ...mockApiData,
        value: () => mockApiData,
        hasValue: () => true
    };
}

class MockFormService {
    form = new FormGroup({
        course: new FormControl(null),
        department: new FormControl(null),
        learningOutcomes: new FormArray([]),
        assessmentForms: new FormArray([]),
        chosenAiUses: new FormControl<string[]>([])
    });
}

describe('CourseIntegrationComponent', () => {
    let component: CourseIntegrationComponent;
    let fixture: ComponentFixture<CourseIntegrationComponent>;
    let formService: MockFormService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseIntegrationComponent, ReactiveFormsModule],
            providers: [
                provideRouter([]),
                { provide: ApiService, useClass: MockApiService },
                { provide: FormService, useClass: MockFormService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CourseIntegrationComponent);
        component = fixture.componentInstance;
        formService = TestBed.inject(FormService) as unknown as MockFormService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should filter examples based on the selected scale level', () => {
        component.selectedScaleLevel.setValue(AiAssessmentScaleLevel.AI_COLLABORATION);
        fixture.detectChanges();
        expect(component.visibleExamples().length).toBe(2);
        expect(component.visibleExamples().every(ex => ex.scaleLevel === AiAssessmentScaleLevel.AI_COLLABORATION)).toBeTrue();
    });

    it('should add an AI use example on change', () => {
        component.onExampleChange('1');
        expect(formService.form.controls.chosenAiUses.value).toEqual(['1']);
    });

    it('should remove an AI use example on change if it already exists', () => {
        component.chosenAiUses.setValue(['1', '2']);
        component.onExampleChange('1');
        expect(formService.form.controls.chosenAiUses.value).toEqual(['2']);
    });

    it('should update the scale level from the AiScaleSelectComponent', () => {
        const aiScaleSelect = fixture.debugElement.query(By.directive(AiScaleSelectComponent)).componentInstance as AiScaleSelectComponent;
        aiScaleSelect.selectValue(AiAssessmentScaleLevel.AI_PLANNING);
        fixture.detectChanges();
        expect(component.selectedScaleLevel.value).toBe(AiAssessmentScaleLevel.AI_PLANNING);
    });
});
