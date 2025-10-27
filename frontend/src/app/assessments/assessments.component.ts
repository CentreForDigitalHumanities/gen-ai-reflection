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
    selector: "gr-assessments",
    templateUrl: "./assessments.component.html",
    styleUrls: ["./assessments.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, CommonModule, ReactiveFormsModule, FontAwesomeModule, AssessmentFormSubformComponent],
})
export class AssessmentsComponent {
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

    public addAssessment = this.formService.addAssessment;
    public removeAssessment = this.formService.removeAssessment;
}
