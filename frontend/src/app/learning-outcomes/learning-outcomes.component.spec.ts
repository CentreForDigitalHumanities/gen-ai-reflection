import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LearningOutcomesComponent } from "./learning-outcomes.component";
import { provideRouter, RouterLink } from "@angular/router";

describe("LearningOutcomesComponent", () => {
    let component: LearningOutcomesComponent;
    let fixture: ComponentFixture<LearningOutcomesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LearningOutcomesComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(LearningOutcomesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
