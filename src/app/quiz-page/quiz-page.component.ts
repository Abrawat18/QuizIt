import { Component, EventEmitter, OnInit ,Input,Output, HostListener } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})

export class QuizPageComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
}

  @Input() arrQuizContent;
  @Output() quizScore = new EventEmitter<number>();

  ageRange: number;
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
  category = ""
  ansGivenForQuestion = false;

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
    if(this.ageRange == 3){
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
    this.ansGivenForQuestion = false;
    if(this.arrQuizContent.results.length==0){
        this.isQuizContentEmpty=true
    }else{
      this.arrQuestions = this.arrQuizContent.results;
      this.category = this.arrQuestions[0].category;
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
    this.ansGivenForQuestion = true
  }

  showAlertForEmptyAns(){
    var txt;
      
  }
  
  buttonNextTapped(){
    if(this.askConfirmation()==0){
      return
    }
    this.handleOptionRendering();
    this.validateAnswer();
    console.log(this.currentQuestionIndex,this.arrQuestions.length)
    if(this.currentQuestionIndex == this.arrQuestions.length-1){
        this.quizScore.emit(this.userScore)
        if(this.ageRange == 2){
          this.checkIfUserLevelIsToBeUpgraded();
        }
        console.log("emiited");
    }else{
      this.currentQuestionIndex++;
    }
    this.updateCurrentQuestionAnsValue();
    this.inputText = "";
  }

  askConfirmation(){
    if(!this.isOptionEnabled){
      if(this.inputText === ""){
        return this.alertToProcced()
      }else{
        this.userAnswer = this.inputText;
      }
    }else{
      if(this.ansGivenForQuestion == false){
        return this.alertToProcced();
      }
    }
  }
  alertToProcced(){
    if (confirm("Are you sure you want to proceed without answering the quiz?")) {
        
    } else {
      return 0;
    }
  }

  changeCategory() {
    this.quizScore.emit(-1)
  }

  buttonHintTapped(){
    this.isOptionEnabled = true;
  }

  buttonQuitTapped(){
    if (confirm("Are you sure you want quit the quiz?")) {
      this.quizScore.emit(-1)
    } else {
      return;
    }
  }

}
