import { Component } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";

@Component({
    selector: "gr-course-integration",
    templateUrl: "./course-integration.component.html",
    styleUrls: ["./course-integration.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent],
})
export class CourseIntegrationComponent {
    public navButtons: NavButton[] = [
        {
            label: $localize`Back to Step 2`,
            direction: "back",
        },
        {
            label: $localize`Go to Summary`,
            direction: "next",
        },
    ];
}
