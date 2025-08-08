import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LearningOutcomesForm } from '../../services/form.service';

@Component({
    selector: 'gr-ilo-select',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './ilo-select.component.html',
    styleUrl: './ilo-select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IloSelectComponent),
            multi: true,
        },
    ],
})
export class IloSelectComponent implements ControlValueAccessor {
    @Input({ required: true }) iloForm!: LearningOutcomesForm;
    @Input({ required: true }) formIndex!: number;

    public value: string[] = [];
    public disabled = false;

    onChange: (value: string[]) => void = () => { };
    onTouched: () => void = () => { };

    writeValue(value: string[]): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onToggle(checked: boolean): void {
        const iloId = this.iloForm.controls.id.value;
        const current = this.value ?? [];
        let next: string[];
        if (checked) {
            next = current.includes(iloId) ? current : [...current, iloId];
        } else {
            next = current.filter(id => id !== iloId);
        }
        this.value = next;
        this.onChange(this.value);
        this.onTouched();
    }

    isChecked(): boolean {
        return this.value?.includes(this.iloForm.controls.id.value) ?? false;
    }
}
