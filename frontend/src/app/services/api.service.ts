import { inject, Injectable } from "@angular/core";
import { ApiResponse } from "../shared/types";
import { HttpClient, httpResource } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private http = inject(HttpClient);

    serverData = httpResource<ApiResponse>(() => `/api/data/`);

    public generateReportPDF(data: any) {
        return this.http.post("/api/report/generate-pdf/", data, {responseType: "blob"});
    }

    public generateReportHTML(data: any) {
        return this.http.post("/api/report/generate-html/", data, {responseType: "text"});
    }
}
