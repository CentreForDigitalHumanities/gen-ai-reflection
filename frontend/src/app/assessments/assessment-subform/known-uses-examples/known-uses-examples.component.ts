import { Component, computed, inject, input } from '@angular/core';
import { KnownAiUse } from '../../../shared/types';
import { ApiService } from '../../../services/api.service';
import { NgbAccordionModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'gr-known-uses-examples',
    imports: [NgbAccordionModule, NgbPopover],
    templateUrl: './known-uses-examples.component.html',
    styleUrl: './known-uses-examples.component.scss'
})
export class KnownUsesExamplesComponent {
    readonly assessmentFormId = input.required<number>();

    private apiService = inject(ApiService);

    public knownAiUses = computed<KnownAiUse[]>(() => {
        const assessmentFormId = this.assessmentFormId();
        const serverData = this.apiService.serverData.value();
        if (!serverData) {
            return [];
        }

        const uses = serverData.assessmentForms.find(af => af.id === assessmentFormId)?.knownAiUses ?? [];

        return uses.map(use => ({
            ...use,
            examples: use.examples.filter(example => example.assessmentFormIds.includes(assessmentFormId)),
        }));
    });
}
