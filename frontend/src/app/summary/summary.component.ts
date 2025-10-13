import {Component, inject} from '@angular/core';
import {NavButton, NavButtonsComponent} from "../nav-buttons/nav-buttons.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'gr-done',
    imports: [
        NavButtonsComponent,
        ReactiveFormsModule
    ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
    private router = inject(Router);
    public navButtons: NavButton[] = [
        {
            label: $localize`Back to Step 3`,
            direction: "back",
            link: "/course-integration",
        },
        {
            label: $localize`Start over`,
            direction: "next",
            link: "/",
        },
    ];

}
