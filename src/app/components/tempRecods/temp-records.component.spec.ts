import {TestBed, ComponentFixture, inject} from "@angular/core/testing";
import {TempRecordsComponent} from "./temp-records.component";
import {TempDetailsComponent} from "../tempDetails/temp-details.component";
import {WeatherStore} from "../../shared/stores/weatherStore";
import {By} from "@angular/platform-browser";
import {TempDetailData} from "../../shared/models/temp-details.model";

describe("TempRecords Component", () => {
  let fixture: ComponentFixture<TempRecordsComponent>;
  let comp: TempRecordsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempDetailsComponent, TempRecordsComponent], providers: [WeatherStore]
    });
    fixture = TestBed.createComponent(TempRecordsComponent);
    comp = fixture.componentInstance;
  });

  it("should be defined", () => {
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp).toBeDefined();
  });

  it("should be init with records", inject([WeatherStore], (weatherStore) => {
    const tempDetailData = new TempDetailData("barcelona", {"temp": 286.83, "pressure": 1015, "humidity": 100, "temp_min": 286.15, "temp_max": 287.15});
    const tempDetailDataArray: TempDetailData[]  = [];
    tempDetailDataArray.push(tempDetailData);
    weatherStore.saveWeather(tempDetailDataArray);
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp).toBeDefined();
  }));

  it("should pass weatherTime to tempDetailsComponent", inject([WeatherStore], (weatherStore) => {
    comp.ngOnInit();
    spyOn(weatherStore, "getWeatherByTime");
    comp.sendWeatherTimeToTempComp("1494545455");
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css("temp-details")).nativeElement).toBeDefined;
    expect(weatherStore.getWeatherByTime).toHaveBeenCalled();
  }));


});
