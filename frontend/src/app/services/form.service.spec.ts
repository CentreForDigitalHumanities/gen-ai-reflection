import { fakeAsync, TestBed, tick } from "@angular/core/testing";

import { FormService } from "./form.service";

describe("FormService", () => {
    let service: FormService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FormService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should have one learning outcome by default", () => {
        expect(service.form.controls.learningOutcomes.length).toBe(1);
    });

    describe("addNewLearningOutcome", () => {
        it("should add a new learning outcome", () => {
            service.addNewLearningOutcome();
            expect(service.form.controls.learningOutcomes.length).toBe(2);
        });
    });

    describe("removeLearningOutcome", () => {
        it("should not remove a learning outcome if there is only one", () => {
            service.removeLearningOutcome(0);
            expect(service.form.controls.learningOutcomes.length).toBe(1);
        });

        it("should remove a learning outcome if there are more than one", () => {
            service.addNewLearningOutcome();
            expect(service.form.controls.learningOutcomes.length).toBe(2);
            service.removeLearningOutcome(1);
            expect(service.form.controls.learningOutcomes.length).toBe(1);
        });
    });

    it("should reset aiUse when assessmentForm changes to a non-null value", (() => {
        service.form.controls.aiUse.setValue("some value");
        expect(service.form.controls.aiUse.value).toBe("some value");
        service.form.controls.assessmentForm.setValue("new value");
        // Flushes effects.
        TestBed.tick();
        expect(service.form.controls.aiUse.value).toBeNull();
    }));

    it("should not reset aiUse when assessmentForm changes to null", (() => {
        service.form.controls.aiUse.setValue("some value");
        expect(service.form.controls.aiUse.value).toBe("some value");
        service.form.controls.assessmentForm.setValue(null);
        TestBed.tick();
        expect(service.form.controls.aiUse.value).toBe("some value");
    }));
});
