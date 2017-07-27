import { inject, TestBed } from "@angular/core/testing";

import { WeatherStore } from "./weatherStore";

describe("WeatherStore Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [WeatherStore]});
  });

  it("should be defined", inject([WeatherStore], (weatherStore) => {

    expect(weatherStore).toBeDefined();
  }));

  it("should save weather", inject([WeatherStore], (weatherStore) => {
    const weather = {"barcelona": "23º"};
    weatherStore.saveWeather(weather);
    expect(weatherStore.getCurrentWeather()).toBe(weather);
  }));

  it("should get weather with time", inject([WeatherStore], (weatherStore) => {
    weatherStore.saveWeather({"barcelona": "23º"});
    let weather = weatherStore.getCurrentWeather();
    weather = weatherStore.getWeatherByTime(weather.time);

    delete weather.time;
    expect(weather).toEqual({"barcelona": "23º"});
  }));

  it("should get weather map", inject([WeatherStore], (weatherStore) => {
    weatherStore.saveWeather({"barcelona": "23º"});
    expect(weatherStore.getWeatherMap().size).toBe(1);
  }));


});
