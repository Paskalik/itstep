import {Component, OnInit} from '@angular/core';
import * as arr from '../../../environments/environment.time';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../../app.component';
import { PoemComponent } from '../poem.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  arrIntervals: number[];
  arrColors: string[];
  color: string;

  constructor(public translate: TranslateService,
              public app: AppComponent,
              public poem: PoemComponent) {
    translate.addLangs(['en', 'ru', 'ua']);
    translate.setDefaultLang('en');
    translate.use(translate.defaultLang);
  }

  ngOnInit(): void {
    this.arrIntervals = arr.arrIntervals;
    this.arrColors = arr.arrColors;
  }
}
