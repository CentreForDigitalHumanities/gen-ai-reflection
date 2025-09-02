import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFormSelectComponent } from './assessment-form-select.component';
import { Assessment } from '../../shared/types';
import { ComponentRef } from '@angular/core';

const mockOptions: Assessment[] = [{
    id: 'assessment-1',
    name: 'Presentation',
    adjustments: ['Adjustment 1', 'Adjustment 2']
}, {
    id: 'assessment-2',
    name: 'Report',
    adjustments: ['Adjustment 3', 'Adjustment 4']
}];

describe('AssessmentFormSelectComponent', () => {
    let component: AssessmentFormSelectComponent;
    let fixture: ComponentFixture<AssessmentFormSelectComponent>;
    let componentRef: ComponentRef<AssessmentFormSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AssessmentFormSelectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AssessmentFormSelectComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        componentRef.setInput('options', mockOptions);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
