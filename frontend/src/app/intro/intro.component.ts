import { Component, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormService } from "../services/form.service";
import { Router } from "@angular/router";

@Component({
    selector: "gr-intro",
    templateUrl: "./intro.component.html",
    styleUrls: ["./intro.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, ReactiveFormsModule],
})
export class IntroComponent {
    private router = inject(Router);
    private formService = inject(FormService);
    public form = this.formService.form;

    public navButtons: NavButton[] = [
        {
            label: $localize`Go to Step 1`,
            direction: "next",
            link: "/learning-outcomes",
            requiredControl: this.form.controls.course,
        },
    ];



    // The user can navigate by hitting Enter (which submits the form)
    // or by pressing the navigation button.
    public submitCourseName(event: Event): void {
        event.preventDefault();
        this.router.navigate(["/learning-outcomes"]);
    }
}
