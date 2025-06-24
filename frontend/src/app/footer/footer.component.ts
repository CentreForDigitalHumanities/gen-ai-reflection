import { Component, LOCALE_ID, OnDestroy, inject } from "@angular/core";
import { formatDate } from "@angular/common";
import { Subscription } from "rxjs";
import { environment } from "../../environments/environment";
import { DarkModeService } from "../services/dark-mode.service";

@Component({
    selector: "gr-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
    standalone: true,
})
export class FooterComponent implements OnDestroy {
    environment = environment;
    buildTime!: string;
    dark = false;
    subscriptions!: Subscription[];

    constructor() {
        const localeId = inject(LOCALE_ID);
        const darkModeService = inject(DarkModeService);

        this.buildTime = formatDate(
            new Date(environment.buildTime),
            $localize`:@@dateFormat:MMMM dd, yyyy`,
            localeId,
        );
        this.subscriptions = [
            darkModeService.theme$.subscribe(
                (theme) => (this.dark = theme === "dark"),
            ),
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
