import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { DublinIndicator } from "../shared/types";

export type GRForm = FormGroup<{
    course: FormControl<string | null>;
    name: FormControl<string | null>;
    learningOutcomes: FormArray<LearningOutcomesForm>;
    assessments: FormArray<AssessmentForm>;
    chosenAiUses: FormControl<number[]>;
}>;

export type GRFormValue = ReturnType<GRForm["getRawValue"]>;

export type LearningOutcomesForm = FormGroup<{
    id: FormControl<string>;
    intendedOutcome: FormControl<string>;
    dublinIndicator: FormControl<DublinIndicator | null>;
}>;

export type AssessmentForm = FormGroup<{
    assessmentId: FormControl<number | null>;
    iloIds: FormControl<string[]>;
    affected: FormControl<boolean | null>;
}>;

@Injectable({
    providedIn: "root",
})
export class FormService {
    started: boolean = false;

    form: GRForm = new FormGroup({
        course: new FormControl<string | null>(null, {
            validators: [Validators.required],
        }),
        name: new FormControl<string | null>(null, {
            validators: [Validators.required],
        }),
        learningOutcomes: new FormArray<LearningOutcomesForm>([]),
        assessments: new FormArray<AssessmentForm>([]),
        chosenAiUses: new FormControl<number[]>([], {
            nonNullable: true,
        }),
    });

    addNewLearningOutcome(): void {
        // Math.random() is not cryptographically secure, but it suffices
        // for its current purpose of disambiguating forms.
        const newId = Math.random().toString(36).substring(2, 15);
        const newLearningOutcome: LearningOutcomesForm = new FormGroup({
            id: new FormControl<string>(newId, {
                nonNullable: true,
            }),
            intendedOutcome: new FormControl<string>("", {
                nonNullable: true,
            }),
            dublinIndicator: new FormControl<DublinIndicator | null>(null),
        });
        this.form.controls.learningOutcomes.push(newLearningOutcome);
    }

    removeLearningOutcome(id: string): void {
        const index = this.form.controls.learningOutcomes.controls.findIndex(control => control.value.id === id);
        if (index !== -1) {
            this.form.controls.learningOutcomes.removeAt(index);
        }
    }

    addAssessment(): void {
        const newAssessmentForm: AssessmentForm = new FormGroup({
            assessmentId: new FormControl<number | null>(null),
            iloIds: new FormControl<string[]>([], {
                nonNullable: true,
            }),
            affected: new FormControl<boolean | null>(null),
        });
        this.form.controls.assessments.push(newAssessmentForm);
    }

    removeAssessment(index: number): void {
        this.form.controls.assessments.removeAt(index);
    }

    start(): void {
        this.started = true;
    }

    isStarted(): boolean {
        return this.started;
    }
}
