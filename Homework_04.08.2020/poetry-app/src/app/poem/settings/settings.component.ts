import { Component, OnInit } from '@angular/core';
import * as arr from '../../../environments/environment.time';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  arrIntervals: number[];
  arrLangs: string[];
  arrAppColors: string[];
  arrFontColors: string[];
  constructor(
  ) { }

  ngOnInit(): void {
    this.arrIntervals = arr.arrIntervals;
    this.arrLangs = arr.arrLangs;
    this.arrAppColors = arr.arrAppColors;
    this.arrFontColors = arr.arrFontColors;
  }

}
