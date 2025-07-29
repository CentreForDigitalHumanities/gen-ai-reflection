import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseIntegrationComponent } from "./course-integration.component";
import { provideRouter } from "@angular/router";

describe("CourseIntegrationComponent", () => {
    let component: CourseIntegrationComponent;
    let fixture: ComponentFixture<CourseIntegrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseIntegrationComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(CourseIntegrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
