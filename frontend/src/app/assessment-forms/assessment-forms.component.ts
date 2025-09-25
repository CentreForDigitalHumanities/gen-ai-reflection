import { Component, computed, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { ApiService } from "../services/api.service";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { expandIn } from "../shared/animations";
import { AssessmentFormSelectComponent } from "./assessment-form-select/assessment-form-select.component";
import { IloSelectComponent } from "./ilo-select/ilo-select.component";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
    selector: "gr-assessment-forms",
    templateUrl: "./assessment-forms.component.html",
    styleUrls: ["./assessment-forms.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, CommonModule, ReactiveFormsModule, AssessmentFormSelectComponent, IloSelectComponent, FontAwesomeModule],
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

    public faTrash = faTrash;
    public faPlus = faPlus;

    public allAssessmentFormOptions = computed(() => this.apiService.serverData.value()?.assessmentForms ?? []);

    public getAdjustments(assessmentId: number | null): string[] {
        if (!assessmentId) {
            return [];
        }
        const assessmentInfo = this.allAssessmentFormOptions();
        const adjustments = assessmentInfo.find(assessment => assessment.id === assessmentId)?.adjustments ?? [];
        return adjustments.map(adj => adj.text);
    }

    public addAssessmentForm = this.formService.addAssessmentForm;
    public removeAssessmentForm = this.formService.removeAssessmentForm;
}
