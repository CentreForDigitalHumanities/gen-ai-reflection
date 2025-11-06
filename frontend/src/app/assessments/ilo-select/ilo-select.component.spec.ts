import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IloSelectComponent } from './ilo-select.component';
import { FormService, LearningOutcomesForm } from '../../services/form.service';
import { DublinIndicator } from '../../shared/types';

describe('IloSelectComponent', () => {
    let component: IloSelectComponent;
    let fixture: ComponentFixture<IloSelectComponent>;
    let mockFormService: jasmine.SpyObj<FormService>;

    const mockLearningOutcomes: LearningOutcomesForm[] = [
        new FormGroup({
            id: new FormControl('ilo1', { nonNullable: true }),
            intendedOutcome: new FormControl('Learning outcome 1', { nonNullable: true }),
            dublinIndicator: new FormControl<DublinIndicator | null>(DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING)
        }),
        new FormGroup({
            id: new FormControl('ilo2', { nonNullable: true }),
            intendedOutcome: new FormControl('Learning outcome 2', { nonNullable: true }),
            dublinIndicator: new FormControl<DublinIndicator | null>(DublinIndicator.APPLYING_KNOWLEDGE_AND_UNDERSTANDING)
        }),
        new FormGroup({
            id: new FormControl('ilo3', { nonNullable: true }),
            intendedOutcome: new FormControl('Learning outcome 3', { nonNullable: true }),
            dublinIndicator: new FormControl<DublinIndicator | null>(DublinIndicator.MAKING_JUDGEMENTS)
        })
    ];

    beforeEach(async () => {
        const formServiceSpy = jasmine.createSpyObj('FormService', [], {
            form: new FormGroup({
                course: new FormControl<string | null>(null),
                department: new FormControl(null),
                learningOutcomes: new FormArray(mockLearningOutcomes),
                assessmentForms: new FormArray([]),
                chosenAiUses: new FormControl<number[]>([])
            })
        });

        await TestBed.configureTestingModule({
            imports: [IloSelectComponent],
            providers: [
                { provide: FormService, useValue: formServiceSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IloSelectComponent);
        component = fixture.componentInstance;
        mockFormService = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;

        // Set the required input
        fixture.componentRef.setInput('subFormId', 'test-form');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with empty value array', () => {
        expect(component.value).toEqual([]);
        expect(component.disabled).toBeFalse();
    });

    it('should display learning outcomes from form service', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'));
        const labels = fixture.debugElement.queryAll(By.css('.form-check-label'));

        expect(checkboxes.length).toBe(3);
        expect(labels.length).toBe(3);
        expect(labels[0].nativeElement.textContent.trim()).toBe('Learning outcome 1');
        expect(labels[1].nativeElement.textContent.trim()).toBe('Learning outcome 2');
        expect(labels[2].nativeElement.textContent.trim()).toBe('Learning outcome 3');
    });

    it('should generate correct checkbox IDs with subFormId', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'));

        expect(checkboxes[0].nativeElement.id).toBe('ilo-select-ilo1-test-form');
        expect(checkboxes[1].nativeElement.id).toBe('ilo-select-ilo2-test-form');
        expect(checkboxes[2].nativeElement.id).toBe('ilo-select-ilo3-test-form');
    });

    it('should toggle checkbox selection correctly', () => {
        component.value = ['ilo1'];

        // Add new selection
        component.onToggle('ilo2');
        expect(component.value).toEqual(['ilo1', 'ilo2']);

        // Remove existing selection
        component.onToggle('ilo1');
        expect(component.value).toEqual(['ilo2']);
    });

    it('should handle empty value when toggling', () => {
        component.value = [];

        component.onToggle('ilo1');
        expect(component.value).toEqual(['ilo1']);
    });

    it('should check if checkbox is checked correctly', () => {
        component.value = ['ilo1', 'ilo3'];

        expect(component.isChecked('ilo1')).toBeTrue();
        expect(component.isChecked('ilo2')).toBeFalse();
        expect(component.isChecked('ilo3')).toBeTrue();
    });

    it('should handle null value in isChecked', () => {
        component.value = null as any;

        expect(component.isChecked('ilo1')).toBeFalse();
    });


    it('should call onToggle when checkbox is clicked', async () => {
        spyOn(component, 'onToggle');
        await fixture.whenStable();
        fixture.detectChanges();

        const firstCheckbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
        firstCheckbox.nativeElement.click();

        expect(component.onToggle).toHaveBeenCalledWith('ilo1');
    });
});
