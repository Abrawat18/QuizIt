import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import CustomQuizzes from '../../assets/data/custom-quiz.json';
import categories from '../../assets/data/Categories.json';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedData } from '../global/sharedData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  ageRange: string;
  text = 'Custom';
  allCustom;
  customQuestion: any[];
  all_categories: any[];
  json_quiz: any;
  isQuizPageToBeLoaded = false;

  constructor(private data: DataService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.allCustom = CustomQuizzes.CustomQuizzes;
    this.all_categories = categories.categories;
    this.all_categories.sort(function(obj1, obj2) {
      return obj2.hits - obj1.hits;
    });
  }
  
  getDifficultyFromAge(){
    switch(this.ageRange){
      case "child":{
        return "easy";
      }
      case "teen":{
        return "medium";
      }
      case "adult":{
        return "hard";
      }
    }
  }

  getQuiz(category_id: number) {
    const my_params = {params: new HttpParams().set('amount', SharedData.NUMBER_OF_QUESTIONS).set('category', String(category_id))
                      .set('difficulty', this.getDifficultyFromAge()).set('type', SharedData.TYPE_OF_QUESTIONS)};
    this.httpClient.get<any[]>(SharedData.API_URL, my_params).subscribe(res => {
      this.json_quiz = res;
      this.isQuizPageToBeLoaded = true;
    }, err => {});
  }
  public loadCustomQuiz(fileName) {
    this.json_quiz = this.loadLanguage(fileName);
    this.isQuizPageToBeLoaded = true;
  }
  public loadLanguage(lang: string) {
    // @ts-ignore
    return require('../../assets/data/' + lang + '.json');
  }
  view() {
    this.text = this.text === 'Custom' ? 'Category' : 'Custom';
  }
 goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
