import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import {
    provideHttpClient,
    withFetch,
    withInterceptors,
    withXsrfConfiguration,
} from "@angular/common/http";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { platformInterceptor } from "./interceptors/platformInterceptor";
import { provideMatomo, withRouter } from 'ngx-matomo-client';
import { environment } from "../environments/environment";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        // provideClientHydration(),
        provideHttpClient(
            withFetch(),
            withInterceptors([platformInterceptor]),
            withXsrfConfiguration({
                cookieName: "csrftoken",
                headerName: "X-CSRFToken",
            }),
        ),
        ...('matomo' in environment ? [
            provideMatomo({
                siteId: environment.matomo.siteId,
                trackerUrl: environment.matomo.url,
                acceptDoNotTrack: false,
            }, withRouter()),
        ] : []),
        // The language is used as the base_path for finding the right
        // static-files. For example /nl/static/main.js
        // However the routing is done from a base path starting from
        // the root e.g. /home
        // The server should then switch index.html based on a language
        // cookie with a fallback to Dutch e.g. /nl/static/index.html
        { provide: APP_BASE_HREF, useValue: "/" },
    ],
};
