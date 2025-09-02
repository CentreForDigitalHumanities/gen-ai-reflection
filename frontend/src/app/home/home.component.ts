import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Department, FormService } from "../services/form.service";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "gr-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [NgOptimizedImage, ReactiveFormsModule],
    standalone: true,
})
export class HomeComponent {
    private formService = inject(FormService);
    private router = inject(Router);

    public startGkg(): void {
        this.formService.form.controls.department.setValue(Department.GKG);
        this.router.navigate(["/intro"]);
    }
}
