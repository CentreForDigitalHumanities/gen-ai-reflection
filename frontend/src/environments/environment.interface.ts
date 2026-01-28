import { MatomoConfiguration } from "ngx-matomo-client";


export interface Environment {
    production: boolean;
    assets: string;
    baseUrl: string;
    buildTime: string;
    version: string;
    sourceUrl: string;
    matomo?: MatomoConfiguration;
}
