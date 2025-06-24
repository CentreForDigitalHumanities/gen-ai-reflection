import { Injectable, signal } from "@angular/core";

export enum Step {
    Home,
    Intro,
    LearningOutcomes,
    AssessmentForms,
    CourseIntegration,
}

@Injectable({
    providedIn: "root",
})
export class NavigationService {
    currentStep = signal<Step>(Step.AssessmentForms);

    navigateTo(step: Step): void {
        this.currentStep.set(step);
    }

    navigateForward(): void {
        const nextStep = this.currentStep();
        if (nextStep < Step.CourseIntegration) {
            this.currentStep.set(nextStep + 1);
        }
    }

    navigateBack(): void {
        const prevStep = this.currentStep();
        if (prevStep > Step.Home) {
            this.currentStep.set(prevStep - 1);
        }
    }
}
