import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { IntroComponent } from "./intro/intro.component";
import { LearningOutcomesComponent } from "./learning-outcomes/learning-outcomes.component";
import { AssessmentsComponent } from "./assessments/assessments.component";
import { CourseIntegrationComponent } from "./course-integration/course-integration.component";

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
        path: "assessments",
        component: AssessmentsComponent,
    },
    {
        path: "course-integration",
        component: CourseIntegrationComponent,
    },
    {
        path: "**",
        redirectTo: "/",
    },
];

export { routes };
