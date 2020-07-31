import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The largest vehicles';
  type: string;

  setType(newType) {
    return this.type = newType;
  }
}
