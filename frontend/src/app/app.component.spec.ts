import { TestBed, waitForAsync } from "@angular/core/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { AppComponent } from "./app.component";
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

describe("AppComponent", () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
