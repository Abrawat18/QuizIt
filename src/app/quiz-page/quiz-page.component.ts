import { Component, OnInit } from '@angular/core';
import questions from '../../assets/data/custom.json';
import { DataService } from '../data.service';



@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})

export class QuizPageComponent implements OnInit {
  ageRange: string;
  arrQuestions;
  currentQuestionIndex: number;
  currentQuestion: string;
  arrCurrentAnswer;
  isOptionEnabled = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.currentQuestionIndex = 0;
    this.updateCurrentQuestionAnsValue();
  }
  updateCurrentQuestionAnsValue(){
    this.arrQuestions = questions.questions;
    this.currentQuestion = this.arrQuestions[this.currentQuestionIndex].question;
    this.arrCurrentAnswer = this.arrQuestions[this.currentQuestionIndex].answers;
  }
  buttonNextTapped(){
    if(this.currentQuestionIndex == this.arrQuestions.length){
      this.currentQuestionIndex =0;
    }else{
      this.currentQuestionIndex++;
    }
    this.updateCurrentQuestionAnsValue();
    this.isOptionEnabled = false;
  }
  buttonHintTapped(){
    this.isOptionEnabled = true;
  }

}
