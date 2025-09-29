import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFormSelectComponent } from './assessment-form-select.component';
import { AssessmentForm } from '../../shared/types';
import { ComponentRef } from '@angular/core';

const mockOptions: AssessmentForm[] = [{
    id: 1,
    name: 'Presentation',
    adjustments: [{
        id: 1,
        text: 'Adjustment 1',
        order: 1
    }, {
        id: 2,
        text: 'Adjustment 2',
        order: 2
    }],
    knownAiUses: []
}, {
    id: 2,
    name: 'Report',
    adjustments: [{
        id: 3,
        text: 'Adjustment 3',
        order: 1
    }],
    knownAiUses: []
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

    it("should load assessment form options on init", () => {
    const options = component.options();

    expect(options.length).toBe(
        mockOptions.length
    );
    expect(options[0].name).toBe(
        mockOptions[0].name
    );
});
});
