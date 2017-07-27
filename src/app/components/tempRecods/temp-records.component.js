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
const weatherStore_1 = require("../../shared/stores/weatherStore");
let TempRecordsComponent = class TempRecordsComponent {
    constructor(weatherS) {
        this.weatherS = weatherS;
        this.recordsTimes = [];
        this.weatherSubs = this.weatherS.getWeatherSubscription().subscribe((currentWeather) => {
            this.recordsTimes.push(currentWeather.time);
        });
    }
    ngOnInit() {
        if (this.weatherS.getWeatherMap()) {
            this.weatherS.getWeatherMap().forEach((value) => {
                this.recordsTimes.push(value.time);
            });
        }
    }
    sendWeatherTimeToTempComp(recordWeatherTime) {
        this.recordWeatherTime = recordWeatherTime;
    }
};
TempRecordsComponent = __decorate([
    core_1.Component({
        selector: "temp-records",
        templateUrl: "temp-records.component.html",
        styleUrls: ["temp-records.component.scss"]
    }),
    __metadata("design:paramtypes", [weatherStore_1.WeatherStore])
], TempRecordsComponent);
exports.TempRecordsComponent = TempRecordsComponent;
//# sourceMappingURL=temp-records.component.js.map