import {Component, DestroyRef, inject} from '@angular/core';
import {FormService} from "../services/form.service";
import {NavButton, NavButtonsComponent} from "../nav-buttons/nav-buttons.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'gr-done',
    imports: [
        NavButtonsComponent,
        ReactiveFormsModule,
    ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
    private formService = inject(FormService);
    private apiService = inject(ApiService);
    private destroyRef = inject(DestroyRef);
    public report = "";
    public navButtons: NavButton[] = [
        {
            label: $localize`Back to Step 3`,
            direction: "back",
            link: "/course-integration",
        },
        {
            label: $localize`Start over`,
            direction: "next",
            link: "/",
        },
    ];
    generateReport() {
        this.apiService.generateReportHTML(this.formService.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(html => {
            this.report = html;
        });
    }
    downloadReport() {
        this.apiService.generateReportPDF(this.formService.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(blob => {
            const anchor = document.createElement('a');
            const url = URL.createObjectURL(blob);
            anchor.href = url;
            anchor.download = 'report.pdf';
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        });
    }
}
