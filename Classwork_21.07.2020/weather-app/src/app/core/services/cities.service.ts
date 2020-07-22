import { Injectable } from '@angular/core';
import {Cities} from "../interfaces/cities";
import {CITIES} from "../../fake_data/cities.mock";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor() { }

  getCities(): Array<Cities> {
    return CITIES;
  }




}
