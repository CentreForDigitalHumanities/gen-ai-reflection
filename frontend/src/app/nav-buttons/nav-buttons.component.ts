import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";

export interface NavButton {
    label: string;
    direction: "next" | "back";
    link: string;
}

@Component({
    selector: "gr-nav-buttons",
    imports: [RouterLink],
    templateUrl: "./nav-buttons.component.html",
    styleUrl: "./nav-buttons.component.scss",
})
export class NavButtonsComponent {
    public navButtons = input<NavButton[]>([]);

    // Make sure the buttons are sorted so 'back' comes before 'next'.
    public sorted = computed(() => {
        const buttons = structuredClone(this.navButtons());
        return buttons.sort((a, b) => {
            if (a.direction === "back" && b.direction === "next") {
                return -1;
            } else if (a.direction === "next" && b.direction === "back") {
                return 1;
            }
            return 0;
        });
    });
}
