import { Component, OnInit } from '@angular/core';
import {Cities} from "../core/interfaces/cities";
import {CitiesService} from "../core/services/cities.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cities: Array<Cities> = [];
  chosenCity;

  constructor(
    private cityService: CitiesService
  ) { }

  ngOnInit(): void {
    this.cities = this.cityService.getCities();
  }

  onChooseCity(index: number): void {
    this.chosenCity = index;
  }

}
