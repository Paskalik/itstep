import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [TodosComponent]
})
export class AppModule { }
