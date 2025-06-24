import { Component, computed, input, inject } from "@angular/core";
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
    private navigation = inject(NavigationService);

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

    public next(): void {
        this.navigation.navigateForward();
    }

    public back(): void {
        this.navigation.navigateBack();
    }
}
