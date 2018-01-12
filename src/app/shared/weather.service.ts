import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import { WeatherStore } from "./stores/weatherStore";
import { Observable } from "rxjs";
import { Environment } from "../../environment/environment";
import { Weather } from "./models/weather.model";
import { TempDetailData } from "./models/temp-details.model";

@Injectable()
export class WeatherService {

  private tempDetailsData: TempDetailData[];

  public getAllMode: Boolean = false;

  constructor(private http: HttpClient, private weatherStore: WeatherStore) {

    this.getWeather();
   setInterval(this.getWeather, Environment.weatherAPI.refreshInterval);

  }

  private getWeather = () => {

      const getAll = this.getAllMode;
    const observables: Observable<any>[] = [];

    if (getAll) {
        observables.push(this.http.get(Environment.weatherAPI.url));

    } else {
        Environment.weatherAPI.cities.forEach(city => {
            const params: HttpParams =  new HttpParams().set("q", city).set("appid", Environment.weatherAPI.appid);
            observables.push(this.http.get(Environment.weatherAPI.url, {params})
                .catch((resError: HttpResponse<any>): Observable<HttpResponse<any>> => {
                console.error("Error in service response: " + JSON.stringify(resError));
                const emptyResponse: HttpResponse <any> = undefined;
                return Observable.of(emptyResponse);
            }));
        });
    }

    this.tempDetailsData = [];
    Observable.forkJoin(observables).subscribe((responses: Weather[]) => {
      for (const response  of responses) {
          console.log(response);
          if (!response) {
              continue;
          }

          if (getAll) {
              for (const key in response) {
                  this.processAPIResponse(response[key]);
              }
          } else {
              this.processAPIResponse(response);
          }

      }
      if (this.tempDetailsData.length >= 1) {
        this.weatherStore.saveWeather(this.tempDetailsData);
      }
    }, (resError: Response[]) => {
      console.log("Error in service response: " + JSON.stringify(resError));
    });

  };

  private processAPIResponse = (weatherResponse: Weather): void => {

    if (weatherResponse instanceof Object && weatherResponse.name !== undefined && weatherResponse.main !== undefined) {
        this.tempDetailsData.push(new TempDetailData(weatherResponse.name, weatherResponse.main));

    } else {
      console.log("Invalid response: " + JSON.stringify(weatherResponse));
    }
}
}
