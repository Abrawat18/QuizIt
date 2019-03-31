import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import questions from '../../assets/data/custom.json';
import categories from '../../assets/data/Categories.json';
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedData } from '../global/sharedData';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  ageRange: string;
  text = 'Custom';
  allCustom;
  customQuestion = [];
  all_categories:any[];
  json_quiz:any;
  
  constructor(private data: DataService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);

    this.allCustom = questions.questions;

    this.all_categories = categories.categories;
    this.all_categories.sort(function(obj1, obj2){
      return obj2.hits - obj1.hits;
    })
  }

  getQuiz(category_id: number){
    // let data = {amount: 10, category: category_id, difficulty: "easy", type: "multiple"};
    const my_params = {params: new HttpParams().set('amount', '10').set('category', String(category_id))
                      .set('difficulty', 'easy').set('type','boolean')};
    this.httpClient.get<any[]>(SharedData.API_URL, my_params).subscribe(res => {
      this.json_quiz=res;
      console.log(this.json_quiz);
    }, err => {})
  } 

  view() {
    this.text = this.text === 'Custom' ? 'Category' : 'Custom';
  }

  addToCustomQuiz(question) {
    this.customQuestion.push(question);
    console.log(this.customQuestion);
  }

  writeJsonFile(customQuestion) {
    const blob = new Blob([JSON.stringify(customQuestion)], {type : 'application/json'});
    saveAs(blob, 'customQuiz.json');
  }

}
