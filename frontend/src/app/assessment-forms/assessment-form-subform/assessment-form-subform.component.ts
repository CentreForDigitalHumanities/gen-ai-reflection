import { Component, computed, inject, input, output } from '@angular/core';
import { IloSelectComponent } from '../ilo-select/ilo-select.component';
import { AssessmentFormSelectComponent } from '../assessment-form-select/assessment-form-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AssessmentForm, FormService } from '../../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { expandIn } from '../../shared/animations';
import { KnownUsesExamplesComponent } from './known-uses-examples/known-uses-examples.component';

@Component({
    selector: 'gr-assessment-form-subform',
    imports: [AssessmentFormSelectComponent, IloSelectComponent, FontAwesomeModule, ReactiveFormsModule, KnownUsesExamplesComponent],
    templateUrl: './assessment-form-subform.component.html',
    styleUrl: './assessment-form-subform.component.scss',
    animations: [expandIn]
})
export class AssessmentFormSubformComponent {
    private apiService = inject(ApiService);
    private formService = inject(FormService);
    public removeForm = output<void>();

    readonly subFormId = input.required<string>();
    readonly subForm = input.required<AssessmentForm>();

    public faTrash = faTrash;

    public learningOutcomeControls = computed(() => this.formService.form.controls.learningOutcomes.controls);

    public allAssessmentFormOptions = computed(() => this.apiService.serverData.value()?.assessmentForms ?? []);

    public getAdjustments(assessmentId: number | null): string[] {
        if (!assessmentId) {
            return [];
        }
        const assessmentInfo = this.allAssessmentFormOptions();
        const adjustments = assessmentInfo.find(assessment => assessment.id === assessmentId)?.adjustments ?? [];
        return adjustments.map(adj => adj.text);
    }
}
