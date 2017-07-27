import { RouterModule, Routes } from "@angular/router";

import { TempDetailsComponent } from "./components/tempDetails/temp-details.component";
import { TempRecordsComponent } from "./components/tempRecods/temp-records.component";
import {WeatherDashboardComponent} from "./components/weatherDashboard/weather-dashboard.component";

const routes: Routes = [
  { path: "", component: WeatherDashboardComponent},
  { path: "currentTemp", component: TempDetailsComponent },
  { path: "history", component: TempRecordsComponent}
];

export const routing = RouterModule.forRoot(routes);
