import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NavigationService, Step } from "../services/navigation.service";

@Component({
    selector: "gr-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [NgOptimizedImage],
    standalone: true,
})
export class HomeComponent {
    private navigation = inject(NavigationService);

    public start(): void {
        this.navigation.navigateTo(Step.Intro);
    }
}
