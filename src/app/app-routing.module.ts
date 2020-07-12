import { NewsDetailComponent } from './news-detail/news-detail.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./news/news.component";

const routes: Routes = [{
  path: "",
  pathMatch : "full",
  component: NewsComponent
}, {
  path: "detail",
  component: NewsDetailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
