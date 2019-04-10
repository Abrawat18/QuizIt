import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import CustomQuizzes from '../../assets/data/custom-quiz.json';
import categories from '../../assets/data/Categories.json';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { SharedData } from '../global/sharedData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  ageRange: number;
  text = 'PLAY CUSTOM QUIZ';
  allCustom;
  customQuestion: any[];
  all_categories: any[];
  json_quiz: any;
  isQuizPageToBeLoaded = false;
  isResultPageToBeShown = false;
  userScore = 0;
  currentCategoryID = 0;
  currentUser: string;


  constructor(private data: DataService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.data.currentUser.subscribe(message => (this.currentUser = message));

    this.allCustom = CustomQuizzes.CustomQuizzes;
    this.all_categories = categories.categories;
    this.all_categories.sort(function(obj1, obj2) {
      return obj2.hits - obj1.hits;
    });
  }
  
  getDifficultyFromAge(){
    var ageToUse = this.ageRange
    var existingUsernames = JSON.parse(localStorage.getItem("usernames"))
    if (existingUsernames != null){
      for (var user of existingUsernames){
        if (user.name == this.currentUser){
              console.log("promoted age"+user.promotedAge)
              ageToUse = user.promotedAge
           }
        }
    }
    console.log("age to use age"+ageToUse)
    switch(ageToUse){
      case 1:{
        return "easy";
      }
      case 2:{
        return "medium";
      }
      case 3:{
        return "hard";
      }
    }
  }

  getQuiz(category_id: number) {
    this.currentCategoryID = category_id;
    const my_params = {params: new HttpParams().set('amount', SharedData.NUMBER_OF_QUESTIONS).set('category', String(category_id))
                      .set('difficulty', this.getDifficultyFromAge()).set('type', SharedData.TYPE_OF_QUESTIONS)};
    this.httpClient.get<any[]>(SharedData.API_URL, my_params).subscribe(res => {
      this.json_quiz = []
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
    this.text = this.text === 'PLAY CUSTOM QUIZ' ? 'CHOOSE A CATEGORY' : 'PLAY CUSTOM QUIZ';
  }

 goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
  onQuizComplete(score: number){
    if(score==-1){
      this.onQuitTapped()
    }else{
      this.userScore = score;
      this.isResultPageToBeShown=true
      this.isQuizPageToBeLoaded=false
    }
  }

  onQuitTapped(){
    this.isQuizPageToBeLoaded = false;
    this.isResultPageToBeShown=false;
  }
  getRandomQuiz() {
    let arrCategory = [9,10,11,12,14,15]
    var index = Math.floor(Math.random() * (arrCategory.length));
    let category_id = arrCategory[index]
    console.log("category id"+category_id)
    const my_params = {
      params: new HttpParams()
        .set("amount", SharedData.NUMBER_OF_QUESTIONS)
        .set("category", String(category_id))
        .set("difficulty", this.getDifficultyFromAge())
        .set("type", SharedData.TYPE_OF_QUESTIONS)
    };
    this.httpClient.get<any[]>(SharedData.API_URL, my_params).subscribe(
      res => {
        this.json_quiz = res;
        this.isQuizPageToBeLoaded = true;
      },
      err => {}
    );
  }
  changeCategoryAfterShowingResult(number: number){
    this.isQuizPageToBeLoaded =false;
    this.isResultPageToBeShown=false;
    if(number == 2){
      this.getQuiz(this.currentCategoryID)
    }
  }
}
