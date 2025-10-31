import { Component, computed, inject, input } from '@angular/core';
import { KnownAiUse, KnownAiUseExample } from '../../../shared/types';
import { ApiService } from '../../../services/api.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'gr-known-uses-examples',
    imports: [NgbAccordionModule],
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
        return serverData.assessmentForms.find(af => af.id === assessmentFormId)?.knownAiUses ?? [];
    });

    public examplesForUse(knownAiUse: KnownAiUse): KnownAiUseExample[] {
        return knownAiUse.examples.filter(example => example.assessmentForm === this.assessmentFormId());
    }
}
