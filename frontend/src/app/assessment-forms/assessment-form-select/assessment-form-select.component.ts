import { Component, forwardRef, input } from '@angular/core';
import { Assessment } from '../../shared/types';
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
    public options = input.required<Assessment[]>();

    public value: string | null = null;

    onChange: (value: string | null) => void = () => { };
    onTouched: () => void = () => { };
    disabled = false;

    writeValue(value: string | null): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onSelectionChange(selectedValue: string): void {
        this.value = selectedValue;
        this.onChange(selectedValue);
        this.onTouched();
    }
}
