import { Component, input } from '@angular/core';
import { AssessmentForm } from '../../shared/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'gr-assessment-form-select',
    imports: [ReactiveFormsModule],
    templateUrl: './assessment-form-select.component.html',
    styleUrl: './assessment-form-select.component.scss',
})
export class AssessmentFormSelectComponent {
    public options = input.required<AssessmentForm[]>();
    public control = input.required<FormControl<number | null>>();
}
