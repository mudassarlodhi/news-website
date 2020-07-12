import { Component, OnInit } from '@angular/core';


import {NewsService} from "../../services/news.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

date = new Date();
news = null;

constructor(private newsService : NewsService , private router: Router) { }

ngOnInit(): void {

  this.newsService.newsSelected.subscribe((value)=>{
    if(!value){
      this.router.navigate(["/"]);
    }
    else {
      this.news = value;
    }
  });
  window.scrollTo(0, 0);

}

}
