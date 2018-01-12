import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TempDetailsComponent } from "./components/tempDetails/temp-details.component";
import { TempRecordsComponent } from "./components/tempRecods/temp-records.component";
import { WeatherDashboardComponent } from "./components/weatherDashboard/weather-dashboard.component";
import { WeatherService } from "./shared/weather.service";
import { WeatherStore } from "./shared/stores/weatherStore";
import { routing } from "./app.routing";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    WeatherDashboardComponent,
    TempRecordsComponent,
    TempDetailsComponent
  ],
  providers: [
    WeatherService,
    WeatherStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
