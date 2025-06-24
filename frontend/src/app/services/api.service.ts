import { Injectable, resource } from "@angular/core";
import { ApiResponse } from "../../types";
import { Observable, of } from "rxjs";
import {
    mockAssessments,
    mockChallenges,
    mockOpportunities,
} from "../../mockData";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    serverData = resource<ApiResponse, undefined>({
        // TODO: Replace with actual API call.
        loader: () =>
            new Promise<ApiResponse>((resolve) => {
                resolve({
                    challenges: mockChallenges,
                    opportunities: mockOpportunities,
                    assessmentForms: mockAssessments,
                });
            }),
    });
}
