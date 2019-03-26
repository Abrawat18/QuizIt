import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import questions from '../../assets/data/custom.json';

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
  // question = 'what is the circumference of circle?'
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.allCustom = questions.questions;
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
