"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const http_1 = require("@angular/http");
const mock_backend_1 = require("@angular/http/testing/mock_backend");
const weather_service_1 = require("./weather.service");
const weatherStore_1 = require("./stores/weatherStore");
describe("Weather Service", () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [weather_service_1.WeatherService, weatherStore_1.WeatherStore,
                mock_backend_1.MockBackend,
                http_1.BaseRequestOptions,
                {
                    provide: http_1.Http,
                    useFactory: (backend, options) => new http_1.Http(backend, options),
                    deps: [mock_backend_1.MockBackend, http_1.BaseRequestOptions]
                }
            ]
        });
    });
    it("should be defined", testing_1.inject([weather_service_1.WeatherService], (weatherService) => {
        expect(weatherService).toBeDefined();
    }));
    describe("Weather Service OK", () => {
        beforeEach(testing_1.inject([mock_backend_1.MockBackend], (backend) => {
            const baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: { "coord": { "lon": -58.38, "lat": -34.61 }, "weather": [{ "id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09n" }], "base": "stations", "main": { "temp": 286.83, "pressure": 1015, "humidity": 100, "temp_min": 286.15, "temp_max": 287.15 }, "visibility": 10000, "wind": { "speed": 2.6, "deg": 230 }, "clouds": { "all": 90 }, "dt": 1498597200, "sys": { "type": 1, "id": 4699, "message": 0.004, "country": "AR", "sunrise": 1498561273, "sunset": 1498596752 }, "id": 3435910, "name": "Buenos Aires", "cod": 200 } }));
            backend.connections.subscribe((c) => c.mockRespond(baseResponse));
        }));
        it("should get weather from API and store in weatherStore", testing_1.inject([
            weather_service_1.WeatherService,
            weatherStore_1.WeatherStore
        ], (weatherService, weatherStore) => {
            spyOn(weatherStore, "saveWeather");
            expect(weatherStore.getWeatherMap().size).toBe(1);
        }));
    });
    describe("Weather Service KO, Response Error", () => {
        beforeEach(testing_1.inject([mock_backend_1.MockBackend], (backend) => {
            backend.connections.subscribe((c) => c.mockError(new Error()));
        }));
        it("shouldn't get weather from API and store in weatherStore, API ERROR", testing_1.inject([
            weather_service_1.WeatherService,
            weatherStore_1.WeatherStore
        ], (weatherService, weatherStore) => {
            spyOn(weatherStore, "saveWeather");
            expect(weatherStore.getWeatherMap().size).toBe(0);
        }));
    });
    describe("Weather Service KO, invalid response", () => {
        beforeEach(testing_1.inject([mock_backend_1.MockBackend], (backend) => {
            const baseResponse = new http_1.Response(new http_1.ResponseOptions({ "body": { "coord": { "lon": -58.38, "lat": -34.61 } } }));
            backend.connections.subscribe((c) => c.mockRespond(baseResponse));
        }));
        it("shouldn't get weather from API and store in weatherStore, API ERROR", testing_1.inject([
            weather_service_1.WeatherService,
            weatherStore_1.WeatherStore
        ], (weatherService, weatherStore) => {
            spyOn(weatherStore, "saveWeather");
            expect(weatherStore.getWeatherMap().size).toBe(0);
        }));
    });
});
//# sourceMappingURL=weather.service.spec.js.map