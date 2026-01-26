import { Component, inject } from "@angular/core";

import { Router, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
    NgbCollapseModule,
    NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import { BackToStartButtonComponent } from "../shared/back-to-start-button/back-to-start-button.component";

@Component({
    selector: "gr-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
    imports: [
        FontAwesomeModule,
        NgbCollapseModule,
        RouterModule,
        NgbDropdownModule,
        BackToStartButtonComponent
    ],
})
export class MenuComponent {
    private router = inject(Router);
    burgerActive = false;

    toggleBurger() {
        this.burgerActive = !this.burgerActive;
    }

    isHomePage(): boolean {
        return this.router.url === '' || this.router.url === '/';
    }
}
