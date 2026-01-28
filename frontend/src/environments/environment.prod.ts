import { buildTime, version, sourceUrl } from "./version";
import { Environment } from "./environment.interface";

export const environment = {
    production: true,
    // base href is /static/LANG/
    assets: "assets",
    baseUrl: "",
    buildTime,
    version,
    sourceUrl,
    matomo: {
        siteId: "2",
        trackerUrl: "http://127.0.0.1:8080/",
        acceptDoNotTrack: true,
    }
} satisfies Environment;
