import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { PlaneComponent } from './plane/plane.component';
import { ShipComponent } from './ship/ship.component';

import { CustomSizePipe } from './custom.sizepipe';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    PlaneComponent,
    ShipComponent,
    CustomSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
