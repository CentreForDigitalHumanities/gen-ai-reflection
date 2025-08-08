import { Component, computed, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { ApiService } from "../services/api.service";
import { AssessmentForm, FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Assessment } from "../shared/types";
import { expandIn } from "../shared/animations";
import { AssessmentFormSelectComponent } from "./assessment-form-select/assessment-form-select.component";
import { IloSelectComponent } from "./ilo-select/ilo-select.component";

@Component({
    selector: "gr-assessment-forms",
    templateUrl: "./assessment-forms.component.html",
    styleUrls: ["./assessment-forms.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, CommonModule, ReactiveFormsModule, AssessmentFormSelectComponent, IloSelectComponent],
    animations: [expandIn],
})
export class AssessmentFormsComponent {
    private formService = inject(FormService);
    private apiService = inject(ApiService);

    public navButtons: NavButton[] = [
        {
            label: $localize`Go to Step 3`,
            direction: "next",
            link: "/course-integration",
        },
        {
            label: $localize`Back to Step 1`,
            direction: "back",
            link: "/learning-outcomes",
        },
    ];

    public form = this.formService.form;

    private allAssessmentFormOptions = computed(() => this.apiService.serverData.value()?.assessments ?? []);

    public availableOptionsFor(selectedIndex: number): Assessment[] {
        const allOptions = this.allAssessmentFormOptions();
        const assessmentFormControls = this.form.controls.assessmentForms.controls;
        const currentValue = assessmentFormControls[selectedIndex]?.controls.assessmentId.value;
        const selectedIdsExcludingCurrent = assessmentFormControls
            .map((form, index) => (index === selectedIndex ? null : form.controls.assessmentId.value))
            .filter((value) => value !== null);

        return allOptions.filter(opt => opt.id === currentValue || !selectedIdsExcludingCurrent.includes(opt.id));
    }

    public getAdjustments(assessmentId: string | null): string[] {
        if (!assessmentId) {
            return [];
        }
        const assessmentInfo = this.allAssessmentFormOptions();
        const adjustments = assessmentInfo.find(assessment => assessment.id === assessmentId)?.adjustments ?? [];
        return adjustments;
    }

    public addAssessmentForm = this.formService.addAssessmentForm;
    public removeAssessmentForm = this.formService.removeAssessmentForm;
}
