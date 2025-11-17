import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AiAssessmentScaleLevel } from '../../shared/types';

interface RangeItem {
    value: number;
    scaleLevel: AiAssessmentScaleLevel;
    label: string;
}

@Component({
    selector: 'gr-ai-scale-select',
    imports: [ReactiveFormsModule],
    templateUrl: './ai-scale-select.component.html',
    styleUrl: './ai-scale-select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AiScaleSelectComponent,
            multi: true
        }
    ]
})
export class AiScaleSelectComponent implements ControlValueAccessor {
    public rangeItems: RangeItem[] = [
        { value: 1, scaleLevel: AiAssessmentScaleLevel.NO_AI, label: $localize`No AI` },
        { value: 2, scaleLevel: AiAssessmentScaleLevel.AI_PLANNING, label: $localize`AI planning` },
        { value: 3, scaleLevel: AiAssessmentScaleLevel.AI_EDIT, label: $localize`AI editing and feedback` },
        { value: 4, scaleLevel: AiAssessmentScaleLevel.AI_SPECIFIC, label: $localize`AI for specific tasks` },
        { value: 5, scaleLevel: AiAssessmentScaleLevel.FULL_AI, label: $localize`Full AI` },
    ];

    // Default value is null (indeterminate state).
    public value: AiAssessmentScaleLevel | null = null;

    onChange: (value: AiAssessmentScaleLevel | null) => void = () => { };
    onTouched: () => void = () => { };

    public writeValue(value: AiAssessmentScaleLevel | null): void {
        this.value = value;
    }

    public registerOnChange(fn: (value: AiAssessmentScaleLevel | null) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public selectValue(value: AiAssessmentScaleLevel): void {
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }
}
