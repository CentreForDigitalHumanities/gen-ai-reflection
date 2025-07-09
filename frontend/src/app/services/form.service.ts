import { effect, Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { DublinIndicator } from "../../types";
import { toSignal } from "@angular/core/rxjs-interop";

type GRForm = FormGroup<{
    learningOutcomes: FormArray<LearningOutcomesForm>;
    assessmentForm: FormControl<string | null>;
    aiUse: FormControl<string | null>;
}>;

type LearningOutcomesForm = FormGroup<{
    intendedOutcome: FormControl<string>;
    dublinIndicator: FormControl<DublinIndicator | null>;
}>;

@Injectable({
    providedIn: "root",
})
export class FormService {
    form: GRForm = new FormGroup({
        learningOutcomes: new FormArray<LearningOutcomesForm>([
            new FormGroup({
                intendedOutcome: new FormControl<string>("", {
                    nonNullable: true,
                }),
                dublinIndicator: new FormControl<DublinIndicator | null>(null),
            }),
        ]),
        assessmentForm: new FormControl<string | null>(null),
        aiUse: new FormControl<string | null>(null),
    });

    constructor() {
        const assessmentFormChanges = toSignal(
            this.form.controls.assessmentForm.valueChanges,
        );

        // Side effect: reset aiUse control when assessmentForm changes.
        effect(() => {
            const assessmentFormId = assessmentFormChanges();
            if (assessmentFormId) {
                this.form.controls.aiUse.setValue(null);
            }
        });
    }

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
}
