import "zone.js";
import "reflect-metadata";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from "@angular/core";
import {TRANSLATION_EN} from "./locale/TRANSLATION_EN";

if (process.env.ENV === "build") {
  enableProdMode();
}

export function main() {

  const locale = document["locale"];
    const options = { providers: [
      { provide: TRANSLATIONS, useValue: TRANSLATION_EN },
      { provide: TRANSLATIONS_FORMAT, useValue: "xlf" },
      { provide: LOCALE_ID, useValue: locale }
    ] };
    platformBrowserDynamic().bootstrapModule(AppModule, options);
}

if (document.readyState === "complete") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
