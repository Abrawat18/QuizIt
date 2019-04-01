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
  indexCurrentAnswer;
  isOptionEnabled = false;
  userScore = 0;
  userAnswer = "";
  inputText = "";

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.currentQuestionIndex = 0;
    this.updateCurrentQuestionAnsValue();
  }
  updateCurrentQuestionAnsValue(){
    this.arrQuestions = questions.questions;
    let quizObject = this.arrQuestions[this.currentQuestionIndex];
    this.currentQuestion = quizObject.question;
    this.arrCurrentAnswer = quizObject.answers;
    this.indexCurrentAnswer = quizObject.correctIndex;
  }
  validateAnswer(){
    let trueAnswer = this.arrCurrentAnswer[this.indexCurrentAnswer];
    var areEqual = trueAnswer.toUpperCase() === this.userAnswer.toUpperCase();
    if (areEqual){
      this.userScore++;
    }
    alert(this.userScore);
  }
  buttonAnswerTapped(ans){
    alert(ans);
    this.userAnswer = ans;
  }
  buttonNextTapped(){
    if(!this.isOptionEnabled){
      this.userAnswer = this.inputText;
    }
    alert(this.userAnswer)
    this.validateAnswer();
    if(this.currentQuestionIndex == this.arrQuestions.length){
      this.currentQuestionIndex =0;
    }else{
      this.currentQuestionIndex++;
    }
    this.updateCurrentQuestionAnsValue();
    this.isOptionEnabled = false;
    this.inputText = "";
  }

  buttonHintTapped(){
    this.isOptionEnabled = true;
  }

}
