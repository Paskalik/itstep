import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule, routing} from './app-routing.module';
import { AppComponent } from './app.component';
import { PoemComponent } from './poem/poem.component';

@NgModule({
  declarations: [
    AppComponent,
    PoemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
