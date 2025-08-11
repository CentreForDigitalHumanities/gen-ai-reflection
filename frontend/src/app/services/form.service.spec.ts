import { TestBed } from "@angular/core/testing";

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

    it("should have zero learning outcomes by default", () => {
        expect(service.form.controls.learningOutcomes.length).toBe(0);
    });

    describe("addNewLearningOutcome", () => {
        it("should add a new learning outcome", () => {
            service.addNewLearningOutcome();
            expect(service.form.controls.learningOutcomes.length).toBe(1);
        });
    });

    describe("removeLearningOutcome", () => {
        it("should not remove a learning outcome if there is only one", () => {
            service.addNewLearningOutcome();
            service.removeLearningOutcome("1");
            expect(service.form.controls.learningOutcomes.length).toBe(1);
        });

        it("should remove a learning outcome if there are more than one", () => {
            service.addNewLearningOutcome();
            service.addNewLearningOutcome();
            service['form'].controls.learningOutcomes.at(0).get("id")?.setValue("1");
            expect(service.form.controls.learningOutcomes.length).toBe(2);
            service.removeLearningOutcome("1");
            expect(service.form.controls.learningOutcomes.length).toBe(1);
        });
    });

});
