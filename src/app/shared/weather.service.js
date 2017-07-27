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
const http_1 = require("@angular/http");
const weatherStore_1 = require("./stores/weatherStore");
const rxjs_1 = require("rxjs");
const environment_1 = require("../../environment/environment");
const temp_details_model_1 = require("./models/temp-details.model");
let WeatherService = class WeatherService {
    constructor(http, weatherStore) {
        this.http = http;
        this.weatherStore = weatherStore;
        this.getWeather = () => {
            this.tempDetailsData = [];
            rxjs_1.Observable.forkJoin(this.http.get(environment_1.Environment.weatherAPI.url, { search: this.paramsHttp1 }), this.http.get(environment_1.Environment.weatherAPI.url, { search: this.paramsHttp2 }), this.http.get(environment_1.Environment.weatherAPI.url, { search: this.paramsHttp3 }), this.http.get(environment_1.Environment.weatherAPI.url, { search: this.paramsHttp4 })).subscribe((responses) => {
                for (const response of responses) {
                    const tempDetailData = this.processAPIResponse(response);
                    if (tempDetailData) {
                        this.tempDetailsData.push(tempDetailData);
                    }
                }
                if (this.tempDetailsData.length > 1) {
                    this.weatherStore.saveWeather(this.tempDetailsData);
                }
            }, (resError) => {
                console.log("Error in service response: " + JSON.stringify(resError));
            });
        };
        this.processAPIResponse = (res) => {
            let tempDetailData;
            const weatherResponse = res.json();
            if (weatherResponse instanceof Object && weatherResponse.name !== undefined && weatherResponse.main !== undefined) {
                tempDetailData = new temp_details_model_1.TempDetailData(weatherResponse.name, weatherResponse.main);
            }
            else {
                console.log("Invalid response: " + res);
            }
            return tempDetailData;
        };
        this.paramsHttp1 = new http_1.URLSearchParams();
        this.paramsHttp1.set("q", environment_1.Environment.weatherAPI.cities[0]);
        this.paramsHttp1.set("appid", environment_1.Environment.weatherAPI.key);
        this.paramsHttp2 = new http_1.URLSearchParams();
        this.paramsHttp2.set("q", environment_1.Environment.weatherAPI.cities[1]);
        this.paramsHttp2.set("appid", environment_1.Environment.weatherAPI.key);
        this.paramsHttp3 = new http_1.URLSearchParams();
        this.paramsHttp3.set("q", environment_1.Environment.weatherAPI.cities[2]);
        this.paramsHttp3.set("appid", environment_1.Environment.weatherAPI.key);
        this.paramsHttp4 = new http_1.URLSearchParams();
        this.paramsHttp4.set("q", environment_1.Environment.weatherAPI.cities[3]);
        this.paramsHttp4.set("appid", environment_1.Environment.weatherAPI.key);
        this.getWeather();
        setInterval(this.getWeather, environment_1.Environment.weatherAPI.refreshInterval);
    }
};
WeatherService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, weatherStore_1.WeatherStore])
], WeatherService);
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map