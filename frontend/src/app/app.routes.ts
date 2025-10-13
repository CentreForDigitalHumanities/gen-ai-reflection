import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { IntroComponent } from "./intro/intro.component";
import { LearningOutcomesComponent } from "./learning-outcomes/learning-outcomes.component";
import { AssessmentFormsComponent } from "./assessment-forms/assessment-forms.component";
import { CourseIntegrationComponent } from "./course-integration/course-integration.component";
import { SummaryComponent } from "./summary/summary.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
    },
    {
        path: "intro",
        component: IntroComponent,
    },
    {
        path: "learning-outcomes",
        component: LearningOutcomesComponent,
    },
    {
        path: "assessment-forms",
        component: AssessmentFormsComponent,
    },
    {
        path: "course-integration",
        component: CourseIntegrationComponent,
    },
    {
        path: "summary",
        component: SummaryComponent,
    },
    {
        path: "**",
        redirectTo: "/",
    },
];

export { routes };
