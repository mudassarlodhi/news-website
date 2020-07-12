import { Router , ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import {flyInOut , fadeInOutLeft} from "../helpers/animations";


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations : [flyInOut , fadeInOutLeft]
})
export class NewsComponent implements OnInit {

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @ViewChild('pageSize', { static: true }) pageSize: ElementRef;
  itemsPerSlide = 3;
 
  noWrap = false;
 
  
  topHighlights = [];
  newsArticles= [];
  firstNews = null;
  date = new Date();
  isLoading = true;

  constructor(private newsService: NewsService , private router: Router ,  public route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getTopNews();
    this.getNewsWithTopic("global"  , this.pageSize.nativeElement.value);

    this.route.fragment.subscribe(
      (fragment) => {
        console.log(fragment);
        if(fragment==null){
          window.location.hash = '';
        }
        else {
          const element = document.querySelector("#" + fragment);
	        if (element) { 
            setTimeout(() => {
              element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
            }, 1000)
             }
        }
      }
    );
 

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      console.log(text);
      this.getNewsWithTopic(text , this.pageSize.nativeElement.value);
    });



    fromEvent(this.pageSize.nativeElement, 'change').pipe(
     
      // get value
      map((event: any) => {
        console.log(event.target.value);
        return event.target.value;
      })
      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      console.log(text);
      this.getNewsWithTopic(this.searchInput.nativeElement.value  , text);
    });

      // this.getNewsWithTopic("global" , this.pageSize.nativeElement.value);
      
  }

  getTopNews(){
    this.isLoading = true;
    this.newsService.getTopNews().subscribe( (data:any)=>{
      this.topHighlights = data.articles;
      this.firstNews = this.topHighlights[0];
      console.log(this.topHighlights);
      this.isLoading = false;
    });
  }


  getNewsWithTopic(topic:String , pageSize:String) {
    console.log(topic ," ", pageSize);
    pageSize = pageSize=="" ? pageSize  : "&pageSize="+pageSize; 
    topic = topic.trim()=="" ? "global" : topic;
    console.log(pageSize);
  
    this.newsService.getNewsWithTopic(topic , pageSize).subscribe( (data:any)=>{
      this.newsArticles = data.articles;
      console.log(this.newsArticles);
    });
  }

 onNewsDetailClicked(article){
   this.router.navigate(["/detail"]);
   this.newsService.newsSelected.next(article);
 }

}
