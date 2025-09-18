import { Injectable } from "@angular/core";
import { ApiResponse } from "../shared/types";
import { httpResource } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    serverData = httpResource<ApiResponse>(() => `/api/data/`);
}
