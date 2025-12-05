import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { IntroComponent } from "./intro/intro.component";
import { LearningOutcomesComponent } from "./learning-outcomes/learning-outcomes.component";
import { AssessmentsComponent } from "./assessments/assessments.component";
import { CourseIntegrationComponent } from "./course-integration/course-integration.component";
import { SummaryComponent } from "./summary/summary.component";
import { toolStartedGuard } from "./tool-started.guard";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
    },
    {
        path: "intro",
        component: IntroComponent,
        canMatch: [toolStartedGuard],
    },
    {
        path: "learning-outcomes",
        component: LearningOutcomesComponent,
        canMatch: [toolStartedGuard],
    },
    {
        path: "assessments",
        component: AssessmentsComponent,
        canMatch: [toolStartedGuard],
    },
    {
        path: "course-integration",
        component: CourseIntegrationComponent,
        canMatch: [toolStartedGuard],
    },
    {
        path: "summary",
        component: SummaryComponent,
        canMatch: [toolStartedGuard],
    },
    {
        path: "**",
        redirectTo: "/",
    },
];

export { routes };
