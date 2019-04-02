import { Component, OnInit ,Input} from '@angular/core';
import questions from '../../assets/data/custom.json';
import { DataService } from '../data.service';



@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})

export class QuizPageComponent implements OnInit {
  @Input() arrQuizContent;
  ageRange: string;
  arrQuestions;
  currentQuestionIndex: number;
  currentQuestion: string;
  arrCurrentAnswer;
  correctAnswer;
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
    console.log(this.arrQuizContent);
    this.arrQuestions = this.arrQuizContent.results;
    let quizObject = this.arrQuestions[this.currentQuestionIndex];
    this.currentQuestion = quizObject.question;
    this.arrCurrentAnswer = quizObject.incorrect_answers;
    this.correctAnswer = quizObject.correct_answer;
  }
  validateAnswer(){
    let trueAnswer = this.correctAnswer;
    var areEqual = trueAnswer.toUpperCase() === this.userAnswer.toUpperCase();
    if (areEqual){
      this.userScore++;
    }
  }
  buttonAnswerTapped(ans){
    this.userAnswer = ans;
  }
  buttonNextTapped(){
    if(!this.isOptionEnabled){
      this.userAnswer = this.inputText;
    }
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
