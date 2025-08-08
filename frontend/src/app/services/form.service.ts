import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { DublinIndicator } from "../shared/types";

export enum Department {
    TLC = "TLC",
    GKG = "GKG",
    MCW = "MCW",
    "F&R" = "F&R",
}

type GRForm = FormGroup<{
    course: FormControl<string | null>;
    department: FormControl<Department | null>;
    learningOutcomes: FormArray<LearningOutcomesForm>;
    assessmentForms: FormArray<AssessmentForm>;
}>;

export type LearningOutcomesForm = FormGroup<{
    id: FormControl<string>;
    intendedOutcome: FormControl<string>;
    dublinIndicator: FormControl<DublinIndicator | null>;
}>;

export type AssessmentForm = FormGroup<{
    assessmentId: FormControl<string | null>;
    iloIds: FormControl<string[]>;
    affected: FormControl<boolean | null>;
}>;

@Injectable({
    providedIn: "root",
})
export class FormService {
    form: GRForm = new FormGroup({
        course: new FormControl<string | null>(null, {
            validators: [Validators.required],
        }),
        department: new FormControl<Department | null>(null),
        learningOutcomes: new FormArray<LearningOutcomesForm>([]),
        assessmentForms: new FormArray<AssessmentForm>([]),
    });


    addNewLearningOutcome(): void {
        // Math.random() is not cryptographically secure, but it suffices
        // for its current purpose: disambiguation.
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

    addAssessmentForm(): void {
        const newAssessmentForm: AssessmentForm = new FormGroup({
            assessmentId: new FormControl<string | null>(null),
            iloIds: new FormControl<string[]>([], {
                nonNullable: true,
            }),
            affected: new FormControl<boolean | null>(null),
        });
        this.form.controls.assessmentForms.push(newAssessmentForm);
    }

    removeAssessmentForm(index: number): void {
        this.form.controls.assessmentForms.removeAt(index);
    }
}
