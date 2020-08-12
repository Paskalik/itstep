import { Component, OnInit } from '@angular/core';
import * as arr from '../../../environments/environment.time';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru', 'ua']);
    translate.setDefaultLang('en');
    translate.use(translate.defaultLang);
  }

  ngOnInit(): void {
    this.arrIntervals = arr.arrIntervals;
    this.arrLangs = arr.arrLangs;
    this.arrAppColors = arr.arrAppColors;
    this.arrFontColors = arr.arrFontColors;
  }

}
