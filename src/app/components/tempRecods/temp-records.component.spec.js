"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const temp_records_component_1 = require("./temp-records.component");
const temp_details_component_1 = require("../tempDetails/temp-details.component");
const weatherStore_1 = require("../../shared/stores/weatherStore");
const platform_browser_1 = require("@angular/platform-browser");
const temp_details_model_1 = require("../../shared/models/temp-details.model");
describe("TempRecords Component", () => {
    let fixture;
    let comp;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [temp_details_component_1.TempDetailsComponent, temp_records_component_1.TempRecordsComponent], providers: [weatherStore_1.WeatherStore]
        });
        fixture = testing_1.TestBed.createComponent(temp_records_component_1.TempRecordsComponent);
        comp = fixture.componentInstance;
    });
    it("should be defined", () => {
        comp.ngOnInit();
        fixture.detectChanges();
        expect(comp).toBeDefined();
    });
    it("should be init with records", testing_1.inject([weatherStore_1.WeatherStore], (weatherStore) => {
        const tempDetailData = new temp_details_model_1.TempDetailData("barcelona", { "temp": 286.83, "pressure": 1015, "humidity": 100, "temp_min": 286.15, "temp_max": 287.15 });
        const tempDetailDataArray = [];
        tempDetailDataArray.push(tempDetailData);
        weatherStore.saveWeather(tempDetailDataArray);
        comp.ngOnInit();
        fixture.detectChanges();
        expect(comp).toBeDefined();
    }));
    it("should pass weatherTime to tempDetailsComponent", testing_1.inject([weatherStore_1.WeatherStore], (weatherStore) => {
        comp.ngOnInit();
        spyOn(weatherStore, "getWeatherByTime");
        comp.sendWeatherTimeToTempComp("1494545455");
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css("temp-details")).nativeElement).toBeDefined;
        expect(weatherStore.getWeatherByTime).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=temp-records.component.spec.js.map