import { Component, forwardRef, input } from '@angular/core';
import { AssessmentForm } from '../../shared/types';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'gr-assessment-form-select',
    imports: [ReactiveFormsModule],
    templateUrl: './assessment-form-select.component.html',
    styleUrl: './assessment-form-select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AssessmentFormSelectComponent),
            multi: true,
        },
    ],
})
export class AssessmentFormSelectComponent implements ControlValueAccessor {
    public options = input.required<AssessmentForm[]>();

    public value: number | null = null;

    onChange: (value: number | null) => void = () => { };
    onTouched: () => void = () => { };
    disabled = false;

    writeValue(value: number | null): void {
        this.value = value;
    }

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onSelectionChange(selectedValue: number): void {
        this.value = selectedValue;
        this.onChange(selectedValue);
        this.onTouched();
    }

    protected readonly parseInt = parseInt;
}
