import { Component, OnInit } from "@angular/core";
import { WeatherService} from "../../shared/weather.service";

@Component({
  selector: "weather-dashboard",
  templateUrl: "weather-dashboard.component.html",
  styleUrls: ["weather-dashboard.component.scss"]
})
export class WeatherDashboardComponent  implements OnInit {

  constructor(private weatherService: WeatherService) {
  }

  public ngOnInit() {
  }

}
