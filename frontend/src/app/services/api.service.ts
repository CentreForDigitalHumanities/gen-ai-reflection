import { Injectable, resource } from "@angular/core";
import { ApiResponse } from "../shared/types";
import {
    mockAssessments,
    mockChallenges,
    mockOpportunities,
} from "../shared/mockData";

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
                    assessments: mockAssessments,
                });
            }),
    });
}
