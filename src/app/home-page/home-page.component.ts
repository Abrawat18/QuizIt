import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import questions from '../../assets/data/custom.json';
console.log(questions.questions);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ageRange: string;
  text = 'Category';
  allCustom;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.allCustom = questions.questions;
  }

  view() {
    this.text = this.text === 'Category' ? 'Custom' : 'Category';
  }

  createCustomQuiz() {

  }
}
