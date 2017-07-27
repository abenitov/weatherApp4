"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const weatherStore_1 = require("./weatherStore");
describe("WeatherStore Service", () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: [weatherStore_1.WeatherStore] });
    });
    it("should be defined", testing_1.inject([weatherStore_1.WeatherStore], (weatherStore) => {
        expect(weatherStore).toBeDefined();
    }));
    it("should save weather", testing_1.inject([weatherStore_1.WeatherStore], (weatherStore) => {
        const weather = { "barcelona": "23º" };
        weatherStore.saveWeather(weather);
        expect(weatherStore.getCurrentWeather()).toBe(weather);
    }));
    it("should get weather with time", testing_1.inject([weatherStore_1.WeatherStore], (weatherStore) => {
        weatherStore.saveWeather({ "barcelona": "23º" });
        let weather = weatherStore.getCurrentWeather();
        weather = weatherStore.getWeatherByTime(weather.time);
        delete weather.time;
        expect(weather).toEqual({ "barcelona": "23º" });
    }));
    it("should get weather map", testing_1.inject([weatherStore_1.WeatherStore], (weatherStore) => {
        weatherStore.saveWeather({ "barcelona": "23º" });
        expect(weatherStore.getWeatherMap().size).toBe(1);
    }));
});
//# sourceMappingURL=weather-store.service.spec.js.map