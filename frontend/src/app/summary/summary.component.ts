import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormService } from "../services/form.service";
import { NavButton, NavButtonsComponent } from "../nav-buttons/nav-buttons.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AskForLeaveService } from "../services/ask-for-leave.service";
import { RouterLinkWithHref } from '@angular/router';

@Component({
    selector: 'gr-done',
    imports: [
        NavButtonsComponent,
        ReactiveFormsModule,
        RouterLinkWithHref
    ],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
    private formService = inject(FormService);
    private apiService = inject(ApiService);
    private askForLeaveService = inject(AskForLeaveService);
    private destroyRef = inject(DestroyRef);
    public formChanged = true;
    public form = this.formService.form;
    public reportHtml = "";
    public reportPdf: Blob | null = null;
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
            action: (event) => {
                event?.preventDefault();
                window.location.href = '/';

            }
        },
    ];

    ngOnInit() {
        this.formService.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.formChanged = true;
        });
    }

    public generateReport(): void {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.apiService.generateReport(this.formService.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(reportData => {
            this.formChanged = false;
            this.reportHtml = reportData.html;
            const dataArray = Uint8Array.from(window.atob(reportData.pdf), (char) => char.charCodeAt(0));
            this.reportPdf = new Blob([dataArray], { type: 'application/pdf' });
            this.askForLeaveService.allowLeave();
        });
    }

    public downloadReport() {
        if (!this.reportPdf) {
            return;
        }
        const anchor = document.createElement('a');
        const url = URL.createObjectURL(this.reportPdf);
        anchor.href = url;
        anchor.download = 'report.pdf';
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    }
}
