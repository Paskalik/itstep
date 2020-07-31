import { Component, OnInit } from '@angular/core';
import { VehicleInfo } from "../interfaces/vehicle-info";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  car: VehicleInfo = {
    name: 'БелАЗ-75710',
    manufacturer: 'Белорусский автомобильный завод',
    class: 'Карьерный самосвал',
    year: '2013',
    dimensions: {
      length: 20.6,
      width: 9.75,
      height: 8.26
    },
    description: 'Полноприводный двухосный карьерный самосвал грузоподъёмностью 450 тонн производства Белорусского ' +
      'автомобильного завода Самый большой карьерный самосвал в мире, первая модель в новом классе машин особо ' +
      'большой грузоподъёмности. Представлен в сентябре 2013 года, а в январе 2014 года установил рекорд Гиннесса в ' +
      'странах Европы и СНГ, провезя по испытательному полигону груз весом в 503,5 тонны.'
}

  constructor() { }

  ngOnInit(): void {}

}
