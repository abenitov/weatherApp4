"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const weather_dashboard_component_1 = require("./weather-dashboard.component");
const temp_details_component_1 = require("../tempDetails/temp-details.component");
const temp_records_component_1 = require("../tempRecods/temp-records.component");
const weatherStore_1 = require("../../shared/stores/weatherStore");
describe("WeatherDashboard Component", () => {
    let fixture;
    let comp;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [temp_details_component_1.TempDetailsComponent, temp_records_component_1.TempRecordsComponent, weather_dashboard_component_1.WeatherDashboardComponent],
            providers: [weatherStore_1.WeatherStore]
        });
        fixture = testing_1.TestBed.createComponent(weather_dashboard_component_1.WeatherDashboardComponent);
        comp = fixture.componentInstance;
    });
    it("should be defined", () => {
        fixture.detectChanges();
        expect(comp).toBeDefined();
    });
});
//# sourceMappingURL=weather-dashboard.component.spec.js.map