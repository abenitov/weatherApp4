import { TestBed, ComponentFixture, inject } from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import { TempDetailsComponent } from "./temp-details.component";
import { WeatherStore } from "../../shared/stores/weatherStore";
import {TempDetailData} from "../../shared/models/temp-details.model";

describe("TempDetails Component", () => {
  let comp: TempDetailsComponent;
  let fixture: ComponentFixture<TempDetailsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TempDetailsComponent], providers: [WeatherStore]});
    fixture = TestBed.createComponent(TempDetailsComponent);
    comp = fixture.componentInstance;

  });

  it("should be defined", () => {
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp).toBeDefined();
  });

  it("should be init with currentWeather", inject([WeatherStore], (weatherStore) => {
    const tempDetailData = new TempDetailData("barcelona", {"temp": 286.83, "pressure": 1015, "humidity": 100, "temp_min": 286.15, "temp_max": 287.15});
    const tempDetailDataArray: TempDetailData[] = [];
    tempDetailDataArray.push(tempDetailData);
    weatherStore.saveWeather(tempDetailDataArray)
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp).toBeDefined();
    expect(fixture.debugElement.query(By.css("#tempDetails")).nativeElement).toBeDefined;

  }));

});

