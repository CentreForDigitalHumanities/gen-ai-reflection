import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { DublinIndicator } from "../../types";

export enum Department {
    TLC = "TLC",
    GKG = "GKG",
    MCW = "MCW",
    "F&R" = "F&R",
}

type GRForm = FormGroup<{
    course: FormControl<string>;
    department: FormControl<Department | null>;
    learningOutcomes: FormArray<LearningOutcomesForm>;
    assessmentForms: FormArray<AssessmentForm>;
}>;

type LearningOutcomesForm = FormGroup<{
    intendedOutcome: FormControl<string>;
    dublinIndicator: FormControl<DublinIndicator | null>;
}>;

type AssessmentForm = FormGroup<{
    assessmentId: FormControl<string | null>;
    iloIds: FormControl<string[]>;
}>;

@Injectable({
    providedIn: "root",
})
export class FormService {
    form: GRForm = new FormGroup({
        course: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required],
        }),
        department: new FormControl<Department | null>(null),
        learningOutcomes: new FormArray<LearningOutcomesForm>([]),
        assessmentForms: new FormArray<AssessmentForm>([]),
    });


    addNewLearningOutcome(): void {
        const newLearningOutcome: LearningOutcomesForm = new FormGroup({
            intendedOutcome: new FormControl<string>("", {
                nonNullable: true,
            }),
            dublinIndicator: new FormControl<DublinIndicator | null>(null),
        });
        this.form.controls.learningOutcomes.push(newLearningOutcome);
    }

    removeLearningOutcome(index: number): void {
        if (this.form.controls.learningOutcomes.length <= 1) {
            return;
        }
        this.form.controls.learningOutcomes.removeAt(index);
    }

    addAssessmentForm(): void {
        const newAssessmentForm: AssessmentForm = new FormGroup({
            assessmentId: new FormControl<string | null>(null),
            iloIds: new FormControl<string[]>([], {
                nonNullable: true,
            }),
        });
        this.form.controls.assessmentForms.push(newAssessmentForm);
    }

    removeAssessmentForm(index: number): void {
        this.form.controls.assessmentForms.removeAt(index);
    }
}
