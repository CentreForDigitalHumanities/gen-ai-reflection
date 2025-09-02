import { Component, computed, inject } from "@angular/core";
import {
    NavButton,
    NavButtonsComponent,
} from "../nav-buttons/nav-buttons.component";
import { FormService } from "../services/form.service";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Challenges, DublinIndicator, Opportunities } from "../shared/types";
import { ApiService } from "../services/api.service";
import { expandIn } from "../shared/animations";

interface DublinIndicatorOption {
    value: DublinIndicator | null;
    label: string;
}

@Component({
    selector: "gr-learning-outcomes",
    templateUrl: "./learning-outcomes.component.html",
    styleUrls: ["./learning-outcomes.component.scss"],
    standalone: true,
    imports: [NavButtonsComponent, ReactiveFormsModule, CommonModule],
    animations: [expandIn],
})
export class LearningOutcomesComponent {
    private apiService = inject(ApiService);
    private formService = inject(FormService);

    public navButtons: NavButton[] = [
        {
            label: $localize`Go to Step 2`,
            direction: "next",
            link: "/assessment-forms",
        },
        {
            label: $localize`Back to Introduction`,
            direction: "back",
            link: "/intro",
        },
    ];

    public form = this.formService.form;

    public challengeData = computed<Challenges | null>(
        () => this.apiService.serverData.value()?.challenges ?? null
    );
    public opportunityData = computed<Opportunities | null>(
        () => this.apiService.serverData.value()?.opportunities ?? null
    );

    public dublinIndicatorOptions: DublinIndicatorOption[] = [
        { value: null, label: $localize`Select an option` },
        {
            value: DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING,
            label: $localize`Knowledge and Understanding`,
        },
        {
            value: DublinIndicator.APPLYING_KNOWLEDGE_AND_UNDERSTANDING,
            label: $localize`Applying Knowledge and Understanding`,
        },
        {
            value: DublinIndicator.MAKING_JUDGEMENTS,
            label: $localize`Making Judgements`,
        },
        {
            value: DublinIndicator.COMMUNICATION,
            label: $localize`Communication`,
        },
        {
            value: DublinIndicator.LIFELONG_LEARNING_SKILLS,
            label: $localize`Lifelong Learning Skills`,
        },
    ];

    public addLearningOutcome = this.formService.addNewLearningOutcome;

    public removeLearningOutcome = this.formService.removeLearningOutcome;
}
