import { NgOptimizedImage } from "@angular/common";
import { Component, DestroyRef, inject, LOCALE_ID, OnInit } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LanguageInfo, LanguageService } from "../services/language.service";

@Component({
    selector: "gr-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [NgOptimizedImage, ReactiveFormsModule, RouterLinkWithHref],
    standalone: true,
})
export class HomeComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private localeId = inject(LOCALE_ID);
    private languageService = inject(LanguageService);

    loading = false;

    currentLanguage: string;

    /**
     * Use the target languages for displaying the respective language names
     */
    languages?: LanguageInfo["supported"];

    constructor() {
        this.currentLanguage = this.localeId;
    }

    ngOnInit(): void {
        // allow switching even when the current locale is different
        // this should really only be the case in development:
        // then the instance is only running in a single language
        this.languageService.languageInfo$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((languageInfo) => {
                this.currentLanguage = languageInfo.current || this.localeId;
                this.languages = languageInfo.supported;
            });
    }

    setLanguage(language: string): void {
        if (this.currentLanguage === language) {
            return;
        }
        this.loading = true;
        this.languageService
            .set(language)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                // reload the application to make the server route
                // to the different language version
                document.location.reload();
            });
    }
}
