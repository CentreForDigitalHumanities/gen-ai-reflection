import { Component, Inject, afterEveryRender, DOCUMENT } from "@angular/core";
import { CommonModule } from "@angular/common";

    let } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { DarkModeService } from "./services/dark-mode.service";
import { FooterComponent } from "./footer/footer.component";
import { NavigationService, Step } from "./services/navigation.service";
import { HomeComponent } from "./home/home.component";
import { IntroComponent } from "./intro/intro.component";
import { LearningOutcomesComponent } from "./learning-outcomes/learning-outcomes.component";
import { AssessmentFormsComponent } from "./assessment-forms/assessment-forms.component";
import { CourseIntegrationComponent } from "./course-integration/course-integration.component";

@Component({
    selector: "gr-root",
    imports: [
        CommonModule,
        MenuComponent,
        FooterComponent,
        HomeComponent,
        IntroComponent,
        LearningOutcomesComponent,
        AssessmentFormsComponent,
        CourseIntegrationComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    title = "GenAI Reflection Tool";
    Step = Step;
    currentStep = this.navigation.currentStep;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private darkModeService: DarkModeService,
        private navigation: NavigationService,
    ) {
        // Using the DOM API to only render on the browser instead of on the server
        afterEveryRender(() => {
            const style = this.document.createElement("link");
            style.rel = "stylesheet";
            this.document.head.append(style);

            this.darkModeService.theme$.subscribe((theme) => {
                this.document.documentElement.setAttribute(
                    "data-bs-theme",
                    theme,
                );
                style.href = `${theme}.css`;
            });
        });
    }
}
