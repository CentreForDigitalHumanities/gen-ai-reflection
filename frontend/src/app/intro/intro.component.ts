import { Component, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormService } from "../services/form.service";

@Component({
    selector: "gr-intro",
    templateUrl: "./intro.component.html",
    styleUrls: ["./intro.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, ReactiveFormsModule],
})
export class IntroComponent {
    public navButtons: NavButton[] = [
        {
            label: $localize`Go to Step 1`,
            direction: "next",
            link: "/learning-outcomes"
        },
    ];

    private formService = inject(FormService);

    public form = this.formService.form;
}
