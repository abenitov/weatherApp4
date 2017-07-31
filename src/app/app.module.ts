import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TempDetailsComponent } from "./components/tempDetails/temp-details.component";
import { TempRecordsComponent } from "./components/tempRecods/temp-records.component";
import { WeatherDashboardComponent } from "./components/weatherDashboard/weather-dashboard.component";
import { WeatherService } from "./shared/weather.service";
import { WeatherStore } from "./shared/stores/weatherStore";
import { routing } from "./app.routing";

import { removeNgStyles, createNewHosts } from "@angularclass/hmr";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
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
  hmrOnInit(store) {
    console.log("HMR store", store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
