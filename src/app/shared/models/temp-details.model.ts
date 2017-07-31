import { Main } from "./main.model";
export interface TempDetails {

  time: string;
  cities: TempDetailData[];

}


export class TempDetailData {

  private city: string;
  private data: Main;

  constructor(city: string, data: Main) {
    this.city = city;
    this.data = data;

}
}
