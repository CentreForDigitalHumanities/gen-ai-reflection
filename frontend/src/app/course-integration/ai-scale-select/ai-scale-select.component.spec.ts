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
        expect(component.value).toBe(null);
    });


    it('should call onChange when a value is selected', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        component.selectValue(AiAssessmentScaleLevel.AI_PLANNING);
        expect(onChangeSpy).toHaveBeenCalledWith(AiAssessmentScaleLevel.AI_PLANNING);
    });

    it('should update value on radio button change', () => {
        const radioInput = fixture.debugElement.query(By.css('input[type="radio"][value="' + AiAssessmentScaleLevel.NO_AI + '"]')).nativeElement;
        radioInput.click();
        fixture.detectChanges();

        expect(component.value).toBe(AiAssessmentScaleLevel.NO_AI);
    });

    it('should call onChange on radio button change', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        const radioInput = fixture.debugElement.query(By.css('input[type="radio"][value="' + AiAssessmentScaleLevel.AI_EXPLORATION + '"]')).nativeElement;
        radioInput.click();
        fixture.detectChanges();

        expect(onChangeSpy).toHaveBeenCalledWith(AiAssessmentScaleLevel.AI_EXPLORATION);
    });

    it('should select a value on radio button click', () => {
        spyOn(component, 'selectValue').and.callThrough();
        const radioInput = fixture.debugElement.query(By.css('input[type="radio"][value="' + AiAssessmentScaleLevel.AI_PLANNING + '"]')).nativeElement;
        radioInput.click();
        fixture.detectChanges();
        expect(component.selectValue).toHaveBeenCalledWith(AiAssessmentScaleLevel.AI_PLANNING);
        expect(component.value).toBe(AiAssessmentScaleLevel.AI_PLANNING);
    });
});
