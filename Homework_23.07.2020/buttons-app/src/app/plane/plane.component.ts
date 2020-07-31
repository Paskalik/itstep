import { Component, OnInit } from '@angular/core';
import { VehicleInfo } from "../interfaces/vehicle-info";

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss']
})
export class PlaneComponent implements OnInit {
  plane: VehicleInfo = {
    name: 'Stratolaunch Model 351',
    manufacturer: 'Scaled Composites',
    class: 'Самолёт-носитель',
    year: '2020',
    description: 'Американский самолёт-носитель, элемент авиационно-космической системы воздушного старта Stratolaunch. ' +
      'Самолёт имеет двухфюзеляжную конструкцию, оснащён шестью двухконтурными турбореактивными двигателями ' +
      'Pratt & Whitney PW4056. На текущий момент является самолётом с самым длинным крылом в истории авиации.'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
