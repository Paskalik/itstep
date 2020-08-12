import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoemComponent } from './poem/poem.component';

const routes: Routes = [
  { path: '', component: PoemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);
