import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  appColor: string;
  fontColor: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru', 'ua']);
    translate.setDefaultLang('en');
    translate.use(translate.defaultLang);
  }

  public setAppColor(color): void {
    this.appColor = color;
  }

  public setFontColor(color): void {
    this.fontColor = color;
  }
}

