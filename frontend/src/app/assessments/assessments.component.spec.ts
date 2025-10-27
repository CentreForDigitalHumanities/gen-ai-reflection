import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AssessmentsComponent } from "./assessments.component";
import { FormService } from "../services/form.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NavButtonsComponent } from "../nav-buttons/nav-buttons.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ActivatedRoute } from "@angular/router";



describe("AssessmentsComponent", () => {
    let component: AssessmentsComponent;
    let fixture: ComponentFixture<AssessmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AssessmentsComponent,
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

        fixture = TestBed.createComponent(AssessmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
