import {inject, Injectable} from "@angular/core";
import { ApiResponse } from "../shared/types";
import {HttpClient, httpResource} from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private http = inject(HttpClient);
    serverData = httpResource<ApiResponse>(() => `/api/data/`);
}
