import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownUsesExamplesComponent } from './known-uses-examples.component';
import { provideHttpClient } from '@angular/common/http';

describe('KnownUsesExamplesComponent', () => {
    let component: KnownUsesExamplesComponent;
    let fixture: ComponentFixture<KnownUsesExamplesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KnownUsesExamplesComponent],
            providers: [
                provideHttpClient(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(KnownUsesExamplesComponent);
        fixture.componentRef.setInput('assessmentFormId', 1);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
