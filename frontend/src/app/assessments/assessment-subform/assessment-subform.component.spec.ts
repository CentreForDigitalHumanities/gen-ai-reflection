import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSubformComponent } from './assessment-subform.component';
import { ApiResponse, AssessmentForm, Challenges, Opportunities } from '../../shared/types';
import { signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import type { AssessmentForm as AFForm } from '../../services/form.service';
import { FormControl, FormGroup } from '@angular/forms';

const mockForm: AFForm = new FormGroup({
    assessmentId: new FormControl<number | null>(null),
    iloIds: new FormControl<string[]>([], { nonNullable: true }),
    affected: new FormControl<boolean | null>(null),
});

const mockOptions: AssessmentForm[] = [{
    id: 1,
    name: 'Presentation',
    adjustments: [{
        id: 1,
        text: 'Adjustment 1',
        order: 1
    }, {
        id: 2,
        text: 'Adjustment 2',
        order: 2
    }],
    knownAiUses: []
}, {
    id: 2,
    name: 'Report',
    adjustments: [{
        id: 3,
        text: 'Adjustment 3',
        order: 1
    }],
    knownAiUses: []
}];

describe('AssessmentFormSubformComponent', () => {
    let component: AssessmentSubformComponent;
    let fixture: ComponentFixture<AssessmentSubformComponent>;

    const mockApiService = {
        serverData: {
            value: signal<ApiResponse>({
                challenges: {} as Challenges,
                opportunities: {} as Opportunities,
                assessmentForms: mockOptions,
                aiUseExamples: []
            }),
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AssessmentSubformComponent],
            providers: [{ provide: ApiService, useValue: mockApiService },]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AssessmentSubformComponent);
        fixture.componentRef.setInput('subFormId', 'test-form');
        fixture.componentRef.setInput('subForm', mockForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("getAdjustments", () => {
        it("should return empty array when assessmentId is null", () => {
            const adjustments = component.getAdjustments(null);
            expect(adjustments).toEqual([]);
        });

        it("should return adjustments for valid assessmentId", () => {
            const adjustments = component.getAdjustments(1);
            expect(adjustments).toEqual(['Adjustment 1', 'Adjustment 2']);
        });

        it("should return empty array for non-existent assessmentId", () => {
            const adjustments = component.getAdjustments(100);
            expect(adjustments).toEqual([]);
        });
    });
});
