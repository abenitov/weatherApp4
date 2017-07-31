import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { WeatherStore } from "./stores/weatherStore";
import { Observable } from "rxjs";
import { Environment } from "../../environment/environment";
import { Weather } from "./models/weather.model";
import { TempDetailData } from "./models/temp-details.model";

@Injectable()
export class WeatherService {


  private tempDetailsData: TempDetailData[];

  public getAllMode: Boolean = false;

  constructor(private http: Http, private weatherStore: WeatherStore) {

    this.getWeather();
   setInterval(this.getWeather, Environment.weatherAPI.refreshInterval);

  }

  private getWeather = () => {


      const getAll = this.getAllMode;
    let observables: Observable<Response>[] = [];

    if (getAll) {
        observables.push(this.http.get(Environment.weatherAPI.url));

    } else {
        Environment.weatherAPI.cities.forEach( city => {
            observables.push(this.http.get(Environment.weatherAPI.url + "/" + city).catch((resError: Response): Observable<Response> => {
                console.error("Error in service response: " + JSON.stringify(resError));
                const emptyResponse: Response = undefined;
                return Observable.of(emptyResponse);
            }));
        });
    }

    this.tempDetailsData = [];
    Observable.forkJoin(observables).subscribe((responses: Response[]) => {
      for (const response  of responses){
          if (!response) {
              continue;
          }

          if (getAll) {
              for (const key in response.json()) {
                  this.processAPIResponse(response.json()[key]);
              }
          } else {
              this.processAPIResponse(response.json());
          }


      }
      if (this.tempDetailsData.length > 1) {
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
