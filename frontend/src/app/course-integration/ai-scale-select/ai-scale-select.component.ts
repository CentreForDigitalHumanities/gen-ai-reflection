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
        { value: 3, scaleLevel: AiAssessmentScaleLevel.AI_COLLABORATION, label: $localize`AI collaboration` },
        { value: 4, scaleLevel: AiAssessmentScaleLevel.FULL_AI, label: $localize`Full AI` },
        { value: 5, scaleLevel: AiAssessmentScaleLevel.AI_EXPLORATION, label: $localize`AI exploration` }
    ];

    public value: AiAssessmentScaleLevel | null = null; // Default value is the third item.

    onChange: (value: AiAssessmentScaleLevel) => void = () => { };
    onTouched: () => void = () => { };

    public writeValue(value: AiAssessmentScaleLevel): void {
        this.value = value;
    }

    public registerOnChange(fn: (value: AiAssessmentScaleLevel) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public selectValue(value: AiAssessmentScaleLevel): void {
        this.value = value;
        this.onChange(value);
    }


    /**
     * Converts an `AiAssessmentScaleLevel` value to its corresponding numeric value.
     */
    public scaleLevelToNumber(scaleLevel: AiAssessmentScaleLevel | null): number {
        const item = this.rangeItems.find(item => item.scaleLevel === scaleLevel);
        return item ? item.value : 0;
    }

    /**
     * Converts a numeric value to its corresponding `AiAssessmentScaleLevel` value.
     */
    private numberToScaleLevel(value: number): AiAssessmentScaleLevel | null {
        const selectedScaleLevel = this.rangeItems.find(item => item.value === value)?.scaleLevel;
        return selectedScaleLevel ?? null;
    }

    public onRangeChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const rangeValue = parseInt(target.value, 10);
        const selectedScaleLevel = this.numberToScaleLevel(rangeValue);
        if (selectedScaleLevel) {
            this.value = selectedScaleLevel;
            this.onChange(this.value);
        }
    }
}
