import { Component } from "@angular/core";

import { WeatherService } from "./shared/weather.service";

import "../style/app.scss";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  constructor(private weatherService: WeatherService) {
  }
}
