import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AssessmentFormsComponent } from "./assessment-forms.component";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavButtonsComponent } from "../nav-buttons/nav-buttons.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ActivatedRoute } from "@angular/router";



describe("AssessmentFormsComponent", () => {
    let component: AssessmentFormsComponent;
    let fixture: ComponentFixture<AssessmentFormsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AssessmentFormsComponent,
                CommonModule,
                ReactiveFormsModule,
                NavButtonsComponent,
                FontAwesomeModule,
            ],
            providers: [
                FormService,
                {
                    provide: ActivatedRoute,
                    useValue: {},
                }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AssessmentFormsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
