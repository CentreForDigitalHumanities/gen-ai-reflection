import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiScaleSelectComponent } from './ai-scale-select.component';
import { AiAssessmentScaleLevel } from '../../shared/types';
import { By } from '@angular/platform-browser';

describe('AiScaleSelectComponent', () => {
    let component: AiScaleSelectComponent;
    let fixture: ComponentFixture<AiScaleSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AiScaleSelectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AiScaleSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with a default value', () => {
        expect(component.value).toBe(AiAssessmentScaleLevel.AI_COLLABORATION);
    });


    it('should call onChange when a value is selected', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        component.selectValue(AiAssessmentScaleLevel.AI_PLANNING);
        expect(onChangeSpy).toHaveBeenCalledWith(AiAssessmentScaleLevel.AI_PLANNING);
    });

    it('should update value on range change', () => {
        const rangeInput = fixture.debugElement.query(By.css('input[type="range"]')).nativeElement;
        rangeInput.value = '1';
        rangeInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.value).toBe(AiAssessmentScaleLevel.NO_AI);
    });

    it('should call onChange on range change', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        const rangeInput = fixture.debugElement.query(By.css('input[type="range"]')).nativeElement;
        rangeInput.value = '5';
        rangeInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(onChangeSpy).toHaveBeenCalledWith(AiAssessmentScaleLevel.AI_EXPLORATION);
    });

    it('should select a value on option click', () => {
        spyOn(component, 'selectValue').and.callThrough();
        const option = fixture.debugElement.query(By.css('option[value="2"]'));
        option.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.selectValue).toHaveBeenCalledWith(AiAssessmentScaleLevel.AI_PLANNING);
        expect(component.value).toBe(AiAssessmentScaleLevel.AI_PLANNING);
    });
});
