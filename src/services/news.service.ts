




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class NewsService {
  baseUrl = "https://newsapi.org/v2/";
  suffix = "apiKey=d776e50cba364f6983a3761e7850c542";
  
  newsSelected = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { 

  }

  getTopNews(){
    return this.http.get(`${this.baseUrl}top-headlines?sources=bbc-news&pageSize=10&${this.suffix}`).pipe(
      map((data:any)=>{
         data.articles = data.articles.filter(article=>article.urlToImage);
         return data;
      })
    );
  }

  getNewsWithTopic(topic , category) {
    console.log(category);
    console.log(`${this.baseUrl}everything?q=${topic}${category}&sortBy=publishedAt&${this.suffix}`);
   
    return this.http.get(`${this.baseUrl}everything?q=${topic}${category}&sortBy=publishedAt&${this.suffix}`).pipe(
      map((data:any)=>{
         data.articles = data.articles.filter(article=>article.urlToImage);
         return data;
      })
    );
  }

}

