import { inject, Injectable } from "@angular/core";
import { ApiResponse } from "../shared/types";
import { HttpClient, httpResource } from "@angular/common/http";
import { GRFormValue } from "./form.service";
import { Observable } from "rxjs";

export interface ReportData {
    pdf: string;
    html: string;
}

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private http = inject(HttpClient);

    serverData = httpResource<ApiResponse>(() => `/api/data/`);

    public generateReport(data: GRFormValue): Observable<ReportData> {
        return this.http.post<ReportData>("/api/report/generate-report/", data);
    }
}
