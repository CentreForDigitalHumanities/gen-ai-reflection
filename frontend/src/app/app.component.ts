import { Component, afterEveryRender, DOCUMENT, inject, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu/menu.component";
import { DarkModeService } from "./services/dark-mode.service";
import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { AskForLeaveService } from "./services/ask-for-leave.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "gr-root",
    imports: [CommonModule, MenuComponent, FooterComponent, RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    private document = inject<Document>(DOCUMENT);
    private darkModeService = inject(DarkModeService);
    private askForLeaveService = inject(AskForLeaveService);
    private destroyRef = inject(DestroyRef);
    public leaveWarning = false;

    constructor() {
        // Using the DOM API to only render on the browser instead of on the server
        afterEveryRender(() => {
            const style = this.document.createElement("link");
            style.rel = "stylesheet";
            this.document.head.append(style);

            this.darkModeService.theme$.subscribe((theme) => {
                this.document.documentElement.setAttribute(
                    "data-bs-theme",
                    theme
                );
                style.href = `${theme}.css`;
            });
        });
        this.askForLeaveService.leaveAsked$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.leaveWarning = true;
        })
    }

    dismissLeaveWarning() {
        this.leaveWarning = false;
    }
}
