import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class WeatherStore {

  private weatherMap: Map<string, any>;
  private currentWeather: any;
  private newWeather: Subject<any>;


  constructor() {
    this.weatherMap = new Map<string, any>();
    this.newWeather = new Subject<any>();
  }

  public getWeatherByTime(time: string): any {
    return this.weatherMap.get(time);

  }

  public saveWeather(weather: any) {

    const time: Date = new Date();
    weather["time"] = time.getTime().toString();
    this.currentWeather = weather;
    this.weatherMap.set(time.getTime().toString(), weather);
    this.newWeather.next(this.currentWeather);
  }

  public getWeatherMap(): Map<string, any> {

    return this.weatherMap;
  }

  public getCurrentWeather() {
    return this.currentWeather;
  }

  public getWeatherSubscription(): Observable<any> {
    return this.newWeather.asObservable();

  }

}
