"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const app_component_1 = require("./app.component");
const temp_details_component_1 = require("./components/tempDetails/temp-details.component");
const temp_records_component_1 = require("./components/tempRecods/temp-records.component");
const weather_dashboard_component_1 = require("./components/weatherDashboard/weather-dashboard.component");
const weather_service_1 = require("./shared/weather.service");
const weatherStore_1 = require("./shared/stores/weatherStore");
const app_routing_1 = require("./app.routing");
const hmr_1 = require("@angularclass/hmr");
let AppModule = class AppModule {
    constructor(appRef) {
        this.appRef = appRef;
    }
    hmrOnInit(store) {
        console.log("HMR store", store);
    }
    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // remove styles
        hmr_1.removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            weather_dashboard_component_1.WeatherDashboardComponent,
            temp_records_component_1.TempRecordsComponent,
            temp_details_component_1.TempDetailsComponent
        ],
        providers: [
            weather_service_1.WeatherService,
            weatherStore_1.WeatherStore
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [core_1.ApplicationRef])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map