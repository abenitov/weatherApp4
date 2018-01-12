
  import {Coord} from "./coord.model";
  import {WeatherInfo} from "./weather-info.model";
  import {Main} from "./main.model";
  import {Wind} from "./wind.model";
  import {Clouds} from "./clouds.model";
  import {Sys} from "./sys.model";

  export interface Weather {
    coord: Coord;
    weather: WeatherInfo[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
    time: string;
  }
