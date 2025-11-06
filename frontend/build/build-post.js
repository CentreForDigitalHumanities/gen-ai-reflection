const fs = require("fs-extra");
const path = require("path");
const colors = require("colors/safe");

const distPath = path.join(__dirname, "..", "dist");
const assetsDest = path.join(distPath, "assets");

console.log(colors.cyan("\nRunning post-build tasks"));

async function organizeDist() {
    try {
        const locales = fs.readdirSync(distPath).filter((file) => {
            const filePath = path.join(distPath, file);
            return (
                fs.statSync(filePath).isDirectory() &&
                fs.existsSync(path.join(filePath, "assets"))
            );
        });

        if (locales.length === 0) {
            console.log(colors.green("No locale folders with assets found. Nothing to do."));
            return;
        }

        // 1. Copy assets from the first locale folder to the root
        const sourceLocale = locales[0];
        const assetsSource = path.join(distPath, sourceLocale, "assets");

        if (fs.existsSync(assetsSource)) {
            console.log(
                `Copying assets from ${assetsSource} to ${assetsDest}...`
            );
            await fs.copy(assetsSource, assetsDest);
        }

        // 2. Remove assets from all locale folders
        for (const locale of locales) {
            const localeAssetsPath = path.join(distPath, locale, "assets");
            if (fs.existsSync(localeAssetsPath)) {
                console.log(`Removing ${localeAssetsPath}...`);
                await fs.remove(localeAssetsPath);
            }
        }

        console.log(colors.green("✔️ Distribution folder organized successfully."));
    } catch (error) {
        console.error(colors.red(`✖️ Error organizing distribution folder: ${error}`));
        process.exit(1);
    }
}

organizeDist();
