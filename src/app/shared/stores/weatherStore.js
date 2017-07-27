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
const rxjs_1 = require("rxjs");
let WeatherStore = class WeatherStore {
    constructor() {
        this.weatherMap = new Map();
        this.newWeather = new rxjs_1.Subject();
    }
    getWeatherByTime(time) {
        return this.weatherMap.get(time);
    }
    saveWeather(weather) {
        const time = new Date();
        weather["time"] = time.getTime().toString();
        this.currentWeather = weather;
        this.weatherMap.set(time.getTime().toString(), weather);
        this.newWeather.next(this.currentWeather);
    }
    getWeatherMap() {
        return this.weatherMap;
    }
    getCurrentWeather() {
        return this.currentWeather;
    }
    getWeatherSubscription() {
        return this.newWeather.asObservable();
    }
};
WeatherStore = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], WeatherStore);
exports.WeatherStore = WeatherStore;
//# sourceMappingURL=weatherStore.js.map