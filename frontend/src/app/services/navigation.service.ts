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
    public currentStep = signal<Step>(Step.Home);

    public navigateTo(step: Step): void {
        this.currentStep.set(step);
    }

    public navigateForward(): void {
        const nextStep = this.currentStep();
        if (nextStep < Step.CourseIntegration) {
            this.currentStep.set(nextStep + 1);
        }
    }

    public navigateBack(): void {
        const prevStep = this.currentStep();
        if (prevStep > Step.Home) {
            this.currentStep.set(prevStep - 1);
        }
    }
}
