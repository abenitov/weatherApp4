import { TestBed, ComponentFixture } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { WeatherDashboardComponent } from "./weather-dashboard.component";
import { TempDetailsComponent } from "../tempDetails/temp-details.component";
import { TempRecordsComponent } from "../tempRecods/temp-records.component";
import { WeatherStore } from "../../shared/stores/weatherStore";
import { WeatherService } from "../../shared/weather.service";

describe("WeatherDashboard Component", () => {

  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let comp: WeatherDashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [FormsModule, HttpModule],
      declarations: [TempDetailsComponent, TempRecordsComponent, WeatherDashboardComponent],
      providers: [WeatherStore, WeatherService]
    });
    fixture = TestBed.createComponent(WeatherDashboardComponent);
    comp = fixture.componentInstance;
  });

  it("should be defined", () => {

    fixture.detectChanges();
    expect(comp).toBeDefined();
  });
});
