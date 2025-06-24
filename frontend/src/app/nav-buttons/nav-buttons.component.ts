import { Component, computed, input } from "@angular/core";
import { NavigationService, Step } from "../services/navigation.service";

export interface NavButton {
    label: string;
    direction: "next" | "back";
}

@Component({
    selector: "gr-nav-buttons",
    imports: [],
    templateUrl: "./nav-buttons.component.html",
    styleUrl: "./nav-buttons.component.scss",
})
export class NavButtonsComponent {
    navButtons = input<NavButton[]>([]);

    // Make sure the buttons are sorted so 'back' comes before 'next'.
    sorted = computed(() => {
        return this.navButtons().sort((a, b) => {
            if (a.direction === "back" && b.direction === "next") {
                return -1;
            } else if (a.direction === "next" && b.direction === "back") {
                return 1;
            }
            return 0;
        });
    });

    constructor(private navigation: NavigationService) {}

    public next(): void {
        this.navigation.navigateForward();
    }

    public back(): void {
        this.navigation.navigateBack();
    }
}
