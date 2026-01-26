import { buildTime, version, sourceUrl } from "./version";

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
        url: "http://127.0.0.1:8080/"
    }
};
