import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams } from "@angular/http";
import { WeatherStore } from "./stores/weatherStore";
import { Observable } from "rxjs";
import { Environment } from "../../environment/environment";
import { Weather } from "./models/weather.model";
import { TempDetailData } from "./models/temp-details.model";

@Injectable()
export class WeatherService {


  private paramsHttp1: URLSearchParams;
  private paramsHttp2: URLSearchParams;
  private paramsHttp3: URLSearchParams;
  private paramsHttp4: URLSearchParams;
  private tempDetailsData: TempDetailData[];

  constructor(private http: Http, private weatherStore: WeatherStore) {

    this.paramsHttp1 = new URLSearchParams();
    this.paramsHttp1.set("q", Environment.weatherAPI.cities[0]);
    this.paramsHttp1.set("appid", Environment.weatherAPI.key);

    this.paramsHttp2 = new URLSearchParams();
    this.paramsHttp2.set("q", Environment.weatherAPI.cities[1]);
    this.paramsHttp2.set("appid", Environment.weatherAPI.key);

    this.paramsHttp3 = new URLSearchParams();
    this.paramsHttp3.set("q", Environment.weatherAPI.cities[2]);
    this.paramsHttp3.set("appid", Environment.weatherAPI.key);

    this.paramsHttp4 = new URLSearchParams();
    this.paramsHttp4.set("q", Environment.weatherAPI.cities[3]);
    this.paramsHttp4.set("appid", Environment.weatherAPI.key);


    this.getWeather();
   setInterval(this.getWeather, Environment.weatherAPI.refreshInterval);

  }

  private getWeather = ( ) => {

    this.tempDetailsData = [];
    Observable.forkJoin(
      this.http.get(Environment.weatherAPI.url, {search: this.paramsHttp1}),
      this.http.get(Environment.weatherAPI.url, {search: this.paramsHttp2}),
      this.http.get(Environment.weatherAPI.url, {search: this.paramsHttp3}),
      this.http.get(Environment.weatherAPI.url, {search: this.paramsHttp4}),
    ).subscribe((responses: Response[]) => {
      for (const response of responses){

        const tempDetailData: TempDetailData = this.processAPIResponse(response);
        if (tempDetailData) {
          this.tempDetailsData.push(tempDetailData);
        }
      }
      if (this.tempDetailsData.length > 1) {
        this.weatherStore.saveWeather(this.tempDetailsData);
      }
    }, (resError: Response[]) => {
      console.log("Error in service response: " + JSON.stringify(resError));
    });

  };

  private processAPIResponse = (res: Response): TempDetailData => {
    let tempDetailData: TempDetailData;
    const weatherResponse: Weather =  res.json();
    if (weatherResponse instanceof Object && weatherResponse.name !== undefined && weatherResponse.main !== undefined) {
      tempDetailData = new TempDetailData(weatherResponse.name, weatherResponse.main);
    } else {
      console.log("Invalid response: " + res);
    }
    return tempDetailData;
}
}
