import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { WeatherStore } from "../../shared/stores/weatherStore";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: "temp-details",
  templateUrl: "temp-details.component.html",
  styleUrls: ["temp-details.component.scss"]
})
export class TempDetailsComponent implements OnInit, OnDestroy {


  private weatherDetails: any;
  private weatherSubs: Subscription;

  @Input() set weatherTime(newWeatherTime: string) {
    this.weatherDetails = this.weatherS.getWeatherByTime(newWeatherTime);
    this.weatherSubs.unsubscribe();
  }
  constructor( private weatherS: WeatherStore ) {
    this.weatherSubs = this.weatherS.getWeatherSubscription().subscribe((currentWeather) => {
      this.weatherDetails = currentWeather;

    });
  }


  ngOnInit() {

      if (this.weatherS.getCurrentWeather()) {
        this.weatherDetails = this.weatherS.getCurrentWeather();

      }



  }

  ngOnDestroy() {
    this.weatherSubs.unsubscribe();
  }


}
