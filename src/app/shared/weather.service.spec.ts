import { inject, TestBed, fakeAsync } from "@angular/core/testing";
import { HttpModule, Http, ResponseOptions, Response, BaseRequestOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { WeatherService } from "./weather.service";
import { WeatherStore } from "./stores/weatherStore";

describe("Weather Service" , () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [WeatherService, WeatherStore,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]});

  });



  it("should be defined", inject([WeatherService], (weatherService) => {

    expect(weatherService).toBeDefined();
  }));

  describe("Weather Service OK" , () => {

    beforeEach(inject([MockBackend], (backend: MockBackend) => {
      const baseResponse = new Response(new ResponseOptions({body: {"coord":{"lon":-58.38,"lat":-34.61},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09n"}],"base":"stations","main":{"temp":286.83,"pressure":1015,"humidity":100,"temp_min":286.15,"temp_max":287.15},"visibility":10000,"wind":{"speed":2.6,"deg":230},"clouds":{"all":90},"dt":1498597200,"sys":{"type":1,"id":4699,"message":0.004,"country":"AR","sunrise":1498561273,"sunset":1498596752},"id":3435910,"name":"Buenos Aires","cod":200}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
    }));

    it("should get weather from API and store in weatherStore",
      inject([
        WeatherService,
        WeatherStore
      ], (weatherService: WeatherService, weatherStore: WeatherStore) => {
        spyOn(weatherStore, "saveWeather");


        expect(weatherStore.getWeatherMap().size).toBe(1);
      }));

  });

  describe("Weather Service KO, Response Error" , () => {

    beforeEach(inject([MockBackend], (backend: MockBackend) => {
      backend.connections.subscribe((c: MockConnection) => c.mockError(new Error()));
    }));

    it("shouldn't get weather from API and store in weatherStore, API ERROR",
      inject([
        WeatherService,
        WeatherStore
      ], ( weatherService: WeatherService, weatherStore: WeatherStore) => {
        spyOn(weatherStore, "saveWeather");


        expect(weatherStore.getWeatherMap().size).toBe(0);
      }));
  });

  describe("Weather Service KO, invalid response" , () => {

    beforeEach(inject([MockBackend], (backend: MockBackend) => {
      const baseResponse = new Response(new ResponseOptions({"body": {"coord": {"lon": -58.38, "lat": -34.61}}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
    }));

    it("shouldn't get weather from API and store in weatherStore, API ERROR",
      inject([
        WeatherService,
        WeatherStore
      ], ( weatherService: WeatherService, weatherStore: WeatherStore) => {
        spyOn(weatherStore, "saveWeather");


        expect(weatherStore.getWeatherMap().size).toBe(0);
      }));
  });
});
