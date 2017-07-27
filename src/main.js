"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js");
require("reflect-metadata");
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_module_1 = require("./app/app.module");
const core_2 = require("@angular/core");
const TRANSLATION_EN_1 = require("./locale/TRANSLATION_EN");
if (process.env.ENV === "build") {
    core_1.enableProdMode();
}
function main() {
    const locale = document["locale"];
    const options = { providers: [
            { provide: core_2.TRANSLATIONS, useValue: TRANSLATION_EN_1.TRANSLATION_EN },
            { provide: core_2.TRANSLATIONS_FORMAT, useValue: "xlf" },
            { provide: core_2.LOCALE_ID, useValue: locale }
        ] };
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, options);
}
exports.main = main;
if (document.readyState === "complete") {
    main();
}
else {
    document.addEventListener("DOMContentLoaded", main);
}
//# sourceMappingURL=main.js.map