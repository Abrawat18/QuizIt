import { Component, OnInit,EventEmitter,Input,Output} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-child-quiz-page',
  templateUrl: './child-quiz-page.component.html',
  styleUrls: ['./child-quiz-page.component.css']
})

export class ChildQuizPageComponent implements OnInit {
  @Input() arrQuizContent;
  @Output() quizScore = new EventEmitter<number>();
  arrQuestions;
  arrUserAnswer=[];
  arrIncorrectAnswer = [];
  userScore = 0;
  isQuizContentEmpty = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.handleQuizContent();
    }, 50);
  }

  handleQuizContent(){
    console.log(this.arrQuizContent.results.length)
    if(this.arrQuizContent.results.length==0){
      this.isQuizContentEmpty=true
    }else{
    this.arrQuestions = this.arrQuizContent.results;
    this.arrQuestions.forEach( (quizObject, index) => {
      console.log(quizObject);
      quizObject.incorrect_answers.push(quizObject.correct_answer);
      quizObject.incorrect_answers = quizObject.incorrect_answers.sort();
      this.arrIncorrectAnswer.push(quizObject.incorrect_answers);
      this.arrUserAnswer.push("");
    });
  }
    console.log(this.arrQuestions);
  }
  handleScore(ans,question,prevAns){
    var currentAnsAreEqual = ans.toUpperCase() === question.correct_answer.toUpperCase();
    if(prevAns === ""){
      if(currentAnsAreEqual){
        this.userScore++;
      }
    }else{
      var isPrevScoreGiven = prevAns.toUpperCase() === question.correct_answer.toUpperCase();
      if(isPrevScoreGiven&&currentAnsAreEqual){
        //do nothing score given last time,case won't come anyway
      } else if(!isPrevScoreGiven && currentAnsAreEqual){
        this.userScore++;
      }else if(isPrevScoreGiven && !currentAnsAreEqual){
        this.userScore--;
      }
    }
  }

  checkIfUserLevelIsToBeUpgraded(){
    if(((this.userScore)/this.arrQuestions.length)>=0.8){
      //upgrade level
    }
  }
  buttonAnswerTapped(ans,question,index){
      let prevAns = this.arrUserAnswer[index];
      if(prevAns.toUpperCase() === ans.toUpperCase()){
        //do nothing just old answer retapped
      } else{
        this.arrUserAnswer[index]= ans;
        this.handleScore(ans,question,prevAns);
      }
  }

  buttonSubmitTapped(){
    let areAllAnswerGiven = true;
    for(let ans in this.arrUserAnswer){
        if (ans === ""){
          areAllAnswerGiven = false;
          break;
        }
    }
    if(!areAllAnswerGiven){
      if (confirm("Are you sure you want to proceed without answering all questions")) {
        this.quizScore.emit(this.userScore)
      } else {
        return;
      }
    }else{
      this.quizScore.emit(this.userScore)
    }
    this.checkIfUserLevelIsToBeUpgraded();
    console.log(this.userScore);

  }
  buttonQuitTapped(){
    this.quizScore.emit(-1)
  }

}
