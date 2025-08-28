import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IntroComponent } from "./intro.component";
import { provideRouter } from "@angular/router";

describe("IntroComponent", () => {
    let component: IntroComponent;
    let fixture: ComponentFixture<IntroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IntroComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(IntroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
