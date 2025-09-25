import { Component } from "@angular/core";

import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DarkModeToggleComponent } from "../dark-mode-toggle/dark-mode-toggle.component";
import {
    NgbCollapseModule,
    NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "gr-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
    imports: [
        FontAwesomeModule,
        DarkModeToggleComponent,
        NgbCollapseModule,
        RouterModule,
        NgbDropdownModule,
    ],
})
export class MenuComponent {
    burgerActive = false;

    toggleBurger() {
        this.burgerActive = !this.burgerActive;
    }
}
