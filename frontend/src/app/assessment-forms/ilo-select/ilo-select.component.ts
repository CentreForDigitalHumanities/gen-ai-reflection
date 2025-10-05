import { Component, DestroyRef, Input, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormService, LearningOutcomesForm } from '../../services/form.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'gr-ilo-select',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
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
    private formService = inject(FormService);
    private destroy = inject(DestroyRef);

    readonly subFormId = input.required<string>();

    public value: string[] = [];
    public disabled = false;

    public iloValues$ = this.formService.form.valueChanges.pipe(
        startWith(this.formService.form.value),
        map(() => this.formService.form.getRawValue().learningOutcomes),
        takeUntilDestroyed(this.destroy)
    );

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

    onToggle(id: string): void {
        const current = this.value ?? [];
        const next = current.includes(id) ? current.filter(iloId => iloId !== id) : [...current, id];
        this.value = next;
        this.onChange(this.value);
        this.onTouched();
    }

    isChecked(id: string): boolean {
        return this.value?.includes(id) ?? false;
    }
}
