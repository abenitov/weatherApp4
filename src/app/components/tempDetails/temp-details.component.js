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
let TempDetailsComponent = class TempDetailsComponent {
    constructor(weatherS) {
        this.weatherS = weatherS;
        this.weatherSubs = this.weatherS.getWeatherSubscription().subscribe((currentWeather) => {
            this.weatherDetails = currentWeather;
        });
    }
    set weatherTime(newWeatherTime) {
        this.weatherDetails = this.weatherS.getWeatherByTime(newWeatherTime);
        this.weatherSubs.unsubscribe();
    }
    ngOnInit() {
        if (this.weatherS.getCurrentWeather()) {
            this.weatherDetails = this.weatherS.getCurrentWeather();
        }
    }
    ngOnDestroy() {
        this.weatherSubs.unsubscribe();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TempDetailsComponent.prototype, "weatherTime", null);
TempDetailsComponent = __decorate([
    core_1.Component({
        selector: "temp-details",
        templateUrl: "temp-details.component.html",
        styleUrls: ["temp-details.component.scss"]
    }),
    __metadata("design:paramtypes", [weatherStore_1.WeatherStore])
], TempDetailsComponent);
exports.TempDetailsComponent = TempDetailsComponent;
//# sourceMappingURL=temp-details.component.js.map