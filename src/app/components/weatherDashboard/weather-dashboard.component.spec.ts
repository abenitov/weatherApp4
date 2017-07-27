import { TestBed, ComponentFixture } from "@angular/core/testing";
import { WeatherDashboardComponent } from "./weather-dashboard.component";
import { TempDetailsComponent } from "../tempDetails/temp-details.component";
import { TempRecordsComponent } from "../tempRecods/temp-records.component";
import { WeatherStore } from "../../shared/stores/weatherStore";

describe("WeatherDashboard Component", () => {

  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let comp: WeatherDashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempDetailsComponent, TempRecordsComponent, WeatherDashboardComponent],
      providers: [WeatherStore]
    });
    fixture = TestBed.createComponent(WeatherDashboardComponent);
    comp = fixture.componentInstance;
  });

  it("should be defined", () => {

    fixture.detectChanges();
    expect(comp).toBeDefined();
  });
});
