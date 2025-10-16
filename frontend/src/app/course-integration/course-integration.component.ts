import { Component, computed, HostListener, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { AiAssessmentScaleLevel, AIUseExample } from "../shared/types";
import { ApiService } from "../services/api.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormService } from "../services/form.service";
import { AiScaleSelectComponent } from "./ai-scale-select/ai-scale-select.component";
import { startWith } from "rxjs";
import { NgOptimizedImage } from "@angular/common";

@Component({
    selector: "gr-course-integration",
    templateUrl: "./course-integration.component.html",
    styleUrls: ["./course-integration.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, ReactiveFormsModule, AiScaleSelectComponent, NgOptimizedImage],
})
export class CourseIntegrationComponent {
    private apiService = inject(ApiService);
    private formService = inject(FormService);

    public navButtons: NavButton[] = [
        {
            label: $localize`Back to Step 2`,
            direction: "back",
            link: "/assessment-forms",
        },
        {
            label: $localize`Go to Summary`,
            direction: "next",
            link: "/summary",
        },
    ];

    @HostListener('document:keydown.escape')
    public onEscapeKey(): void {
        if (this.showLightbox) {
            this.closeLightbox();
        }
    }

    public showLightbox = false;

    public chosenAiUses = this.formService.form.controls.chosenAiUses;

    private aiUseExamples = computed(() => {
        if (this.apiService.serverData.hasValue()) {
            return this.apiService.serverData.value().aiUseExamples;
        }
        return [];
    });

    public selectedScaleLevel = new FormControl<AiAssessmentScaleLevel>(AiAssessmentScaleLevel.AI_COLLABORATION);

    private selectedScaleLevelChanges = toSignal(
        this.selectedScaleLevel.valueChanges.pipe(
            startWith(this.selectedScaleLevel.value)
        )
    );

    public visibleExamples = computed<AIUseExample[]>(() => {
        const selectedRangeValue = this.selectedScaleLevelChanges();
        const aiUseExamples = this.aiUseExamples();
        if (!selectedRangeValue) {
            return [];
        }
        return aiUseExamples.filter(example => example.scaleLevel === selectedRangeValue);
    });

    public onExampleChange(id: number): void {
        if (this.chosenAiUses.value.includes(id)) {
            this.chosenAiUses.setValue(this.chosenAiUses.value.filter(value => value !== id));
        } else {
            this.chosenAiUses.setValue([...this.chosenAiUses.value, id]);
        }
    }

    public openLightbox(): void {
        this.showLightbox = true;
    }

    public closeLightbox(): void {
        this.showLightbox = false;
    }
}
