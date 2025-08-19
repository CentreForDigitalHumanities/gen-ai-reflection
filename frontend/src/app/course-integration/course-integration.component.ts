import { Component, computed, inject } from "@angular/core";
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

@Component({
    selector: "gr-course-integration",
    templateUrl: "./course-integration.component.html",
    styleUrls: ["./course-integration.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, ReactiveFormsModule, AiScaleSelectComponent],
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

    public chosenAiUses = this.formService.form.controls.chosenAiUses;

    private aiUseExamples = computed(() => {
        if (this.apiService.serverData.hasValue()) {
            return this.apiService.serverData.value().aiUseExamples;
        }
        return [];
    });

    public selectedScaleLevel = new FormControl<AiAssessmentScaleLevel>(AiAssessmentScaleLevel.AI_COLLABORATION);
    private selectedScaleLevelChanges = toSignal(this.selectedScaleLevel.valueChanges);

    public visibleExamples = computed<AIUseExample[]>(() => {
        const selectedRangeValue = this.selectedScaleLevelChanges();
        const aiUseExamples = this.aiUseExamples();
        if (!selectedRangeValue) {
            return [];
        }
        return aiUseExamples.filter(example => example.scaleLevel === selectedRangeValue);
    });
}
