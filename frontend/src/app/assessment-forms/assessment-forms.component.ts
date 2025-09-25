import { Component, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AssessmentFormSubformComponent } from "./assessment-form-subform/assessment-form-subform.component";

@Component({
    selector: "gr-assessment-forms",
    templateUrl: "./assessment-forms.component.html",
    styleUrls: ["./assessment-forms.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, CommonModule, ReactiveFormsModule, FontAwesomeModule, AssessmentFormSubformComponent],
})
export class AssessmentFormsComponent {
    private formService = inject(FormService);

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

    public faPlus = faPlus;

    public form = this.formService.form;

    public addAssessmentForm = this.formService.addAssessmentForm;
    public removeAssessmentForm = this.formService.removeAssessmentForm;
}
