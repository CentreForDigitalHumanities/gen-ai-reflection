import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseIntegrationComponent } from "./course-integration.component";

describe("CourseIntegrationComponent", () => {
    let component: CourseIntegrationComponent;
    let fixture: ComponentFixture<CourseIntegrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseIntegrationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CourseIntegrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
