import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { NavigationService, Step } from "../services/navigation.service";

@Component({
    selector: "gr-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [NgOptimizedImage],
    standalone: true,
})
export class HomeComponent {
    constructor(private navigation: NavigationService) {}

    start(): void {
        this.navigation.navigateTo(Step.Intro);
    }
}
