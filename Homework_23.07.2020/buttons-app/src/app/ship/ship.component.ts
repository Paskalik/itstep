import { Component, OnInit } from '@angular/core';
import { VehicleInfo } from "../interfaces/vehicle-info";

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {
  ship: VehicleInfo = {
    name: 'Prelude FLNG',
    manufacturer: 'Samsung Heavy Industries',
    class: 'Плавучий завод',
    year: '2013',
    dimensions: {
      length:488,
      width: 74,
      height: 105
    },
    description: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
