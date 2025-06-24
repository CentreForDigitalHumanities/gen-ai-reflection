import { Component, computed, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { ApiService } from "../services/api.service";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { AIUse } from "../../types";

@Component({
    selector: "gr-assessment-forms",
    templateUrl: "./assessment-forms.component.html",
    styleUrls: ["./assessment-forms.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, CommonModule, ReactiveFormsModule],
})
export class AssessmentFormsComponent {
    private formService = inject(FormService);
    private apiService = inject(ApiService);

    private formChanges = toSignal(this.formService.form.valueChanges);

    public navButtons: NavButton[] = [
        { label: $localize`Go to Step 3`, direction: "next" },
        { label: $localize`Back to Step 1`, direction: "back" },
    ];

    public form = this.formService.form;

    public assessmentFormOptions = computed(
        () => this.apiService.serverData.value()?.assessmentForms ?? [],
    );

    public aiUseOptions = computed<AIUse[]>(() => {
        const formValue = this.formChanges();
        const selectedAssessmentForm = formValue?.assessmentForm;
        const assessmentFormOptions = this.assessmentFormOptions();

        if (!assessmentFormOptions || !selectedAssessmentForm) {
            return [];
        }
        return this.findAiUses(selectedAssessmentForm);
    });

    public exampleOptions = computed<string[]>(() => {
        const formValue = this.formChanges();
        const selectedAiUse = formValue?.aiUse;

        if (!selectedAiUse) {
            return [];
        }
        return this.findExamples(selectedAiUse);
    });

    public selectAiUse(aiUseId: string): void {
        this.form.controls.aiUse.setValue(aiUseId);
    }

    private findAiUses(assessmentFormId: string): AIUse[] {
        const assessmentFormRecord = this.assessmentFormOptions().find(
            (form) => form.id === assessmentFormId,
        );
        return assessmentFormRecord?.aiUses ?? [];
    }

    private findExamples(aiUseId: string): string[] {
        const aiUseRecord = this.aiUseOptions().find(
            (use) => use.id === aiUseId,
        );
        return aiUseRecord?.examples ?? [];
    }
}
