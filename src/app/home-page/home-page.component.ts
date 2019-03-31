import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


import questions from '../../assets/data/custom.json';
import categories from '../../assets/data/Categories.json';
import { saveAs } from 'file-saver';


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
  randomCategory;
  // question = 'what is the circumference of circle?'
  all_categories:any[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.allCustom = questions.questions;
    this.all_categories = categories.categories;
    this.all_categories.sort(function(obj1, obj2){
      return obj2.hits - obj1.hits;
    })
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
  public buttonRandomClicked() {
    this.randomCategory = this.all_categories[Math.floor(Math.random()*this.all_categories.length)];
    alert(this.randomCategory.text);
    console.info(this.randomCategory);

  }

}
