import { Component, EventEmitter, OnInit ,Input,Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})

export class QuizPageComponent implements OnInit {
  @Input() arrQuizContent;
  @Output() quizScore = new EventEmitter<number>();

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
  isQuizContentEmpty=false

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
    this.currentQuestionIndex = 0;
    this.handleOptionRendering();
    setTimeout(() => {
      return this.updateCurrentQuestionAnsValue();
      ;
  }, 50);

  }

  handleOptionRendering(){
    if(this.ageRange == "adult"){
      this.isOptionEnabled = false;
    }else{
      this.isOptionEnabled = true;
    }
   }

   checkIfUserLevelIsToBeUpgraded(){
    if(((this.userScore)/this.arrQuestions.length)>=0.8){
      //upgrade level
    }
  }

  updateCurrentQuestionAnsValue(){
    if(this.arrQuizContent.results.length==0){
        this.isQuizContentEmpty=true
    }else{
      this.arrQuestions = this.arrQuizContent.results;
      let quizObject = this.arrQuestions[this.currentQuestionIndex];
      this.currentQuestion = unescape(quizObject.question);
      quizObject.incorrect_answers.push(quizObject.correct_answer);
      this.arrCurrentAnswer = quizObject.incorrect_answers;
      this.arrCurrentAnswer.sort();
      this.correctAnswer = quizObject.correct_answer;
    }
    
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
  showAlertForEmptyAns(){
    var txt;
      
  }
  buttonNextTapped(){
    if(!this.isOptionEnabled){
      if(this.inputText === ""){
        if (confirm("Are you sure you want to proceed without answering the quiz?")) {
        
        } else {
          return;
        }
      }else{
        this.userAnswer = this.inputText;
      }
      
    }
    this.handleOptionRendering();
    this.validateAnswer();
    console.log(this.currentQuestionIndex,this.arrQuestions.length)
    if(this.currentQuestionIndex == this.arrQuestions.length-1){
        this.quizScore.emit(this.userScore)
        if(this.ageRange == 'teen'){
          this.checkIfUserLevelIsToBeUpgraded();
        }
        console.log("emiited");
    }else{
      this.currentQuestionIndex++;
    }
    this.updateCurrentQuestionAnsValue();
    this.inputText = "";
  }


  buttonHintTapped(){
    this.isOptionEnabled = true;
  }
  buttonQuitTapped(){
    this.quizScore.emit(-1)
  }

}
