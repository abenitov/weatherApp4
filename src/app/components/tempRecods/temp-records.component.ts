import { Component, OnInit, Output, EventEmitter  } from "@angular/core";

import { WeatherStore } from "../../shared/stores/weatherStore";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "temp-records",
  templateUrl: "temp-records.component.html",
  styleUrls: ["temp-records.component.scss"]
})
export class TempRecordsComponent implements OnInit {

  private recordsTimes: string[];
  private recordWeatherTime: any;
  private weatherSubs: Subscription;

  constructor(private weatherS: WeatherStore) {
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


  public sendWeatherTimeToTempComp(recordWeatherTime: any) {
    this.recordWeatherTime = recordWeatherTime;
  }
}
