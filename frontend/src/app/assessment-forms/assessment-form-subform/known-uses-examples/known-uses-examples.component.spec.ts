import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownUsesExamplesComponent } from './known-uses-examples.component';

describe('KnownUsesExamplesComponent', () => {
    let component: KnownUsesExamplesComponent;
    let fixture: ComponentFixture<KnownUsesExamplesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KnownUsesExamplesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(KnownUsesExamplesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
