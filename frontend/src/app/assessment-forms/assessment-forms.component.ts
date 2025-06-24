import { Component, computed } from "@angular/core";
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
    navButtons: NavButton[] = [
        { label: $localize`Go to Step 3`, direction: "next" },
        { label: $localize`Back to Step 1`, direction: "back" },
    ];

    form = this.formService.form;

    formChanges = toSignal(this.formService.form.valueChanges);

    assessmentFormOptions = computed(
        () => this.apiService.serverData.value()?.assessmentForms ?? [],
    );

    aiUseOptions = computed(() => {
        const formValue = this.formChanges();
        const selectedAssessmentForm = formValue?.assessmentForm;
        const assessmentFormOptions = this.assessmentFormOptions();

        if (!assessmentFormOptions || !selectedAssessmentForm) {
            return [];
        }
        return this.findAiUses(selectedAssessmentForm);
    });

    exampleOptions = computed<string[]>(() => {
        const formValue = this.formChanges();
        const selectedAiUse = formValue?.aiUse;

        if (!selectedAiUse) {
            return [];
        }
        return this.findExamples(selectedAiUse);
    });

    constructor(
        private formService: FormService,
        private apiService: ApiService,
    ) {}

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
