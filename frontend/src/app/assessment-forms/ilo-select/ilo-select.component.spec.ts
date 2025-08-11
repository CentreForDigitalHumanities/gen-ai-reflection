import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { IloSelectComponent } from './ilo-select.component';
import { LearningOutcomesForm } from '../../services/form.service';
import { DublinIndicator } from '../../shared/types';

const mockIloForm: LearningOutcomesForm = new FormGroup({
    id: new FormControl<string>('test-id', { nonNullable: true }),
    intendedOutcome: new FormControl<string>('Test Learning Outcome', { nonNullable: true }),
    dublinIndicator: new FormControl<DublinIndicator | null>(null),
});

describe('IloSelectComponent', () => {
    let component: IloSelectComponent;
    let fixture: ComponentFixture<IloSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IloSelectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IloSelectComponent);
        component = fixture.componentInstance;

        component.iloForm = mockIloForm;
        component.formIndex = 0;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
