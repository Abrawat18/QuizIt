import { Component, OnInit, Input,Output,EventEmitter } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-result-page",
  templateUrl: "./result-page.component.html",
  styleUrls: ["./result-page.component.css"]
})
export class ResultPageComponent implements OnInit {
  @Input() arrChildQuiz;
  @Input() userPerformance;
  @Output() resultActions = new EventEmitter<number>();

  ageRange: number;
  score: number;
  currentUser: string;
  grade = "";
  areAnswersToBeShown = false;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.ageRange = message));
    this.data.currentUser.subscribe(message => (this.currentUser = message));
    this.score = this.userPerformance;
    if(this.ageRange == 1){
      this.areAnswersToBeShown = true
      this.mappingScoreToGradeForChild();
    }
  }

  mappingScoreToGradeForChild(){
    console.log(this.score)
    let percentageScore = this.score/10;
    if(percentageScore >= 0.8){
      this.grade = "A+"
      this.askUserToUpgradeLevel();
    }else if(percentageScore > 0.50 && percentageScore < 0.80){
      this.grade = "A"
    }else if(percentageScore > 0.25 && percentageScore <= 0.5){
      this.grade = "B+"
    }else{
      this.grade = "B"
    }
  }
  
  askUserToUpgradeLevel(){
    if (confirm("You have performed above average!!Do you want to upgrade your level?")) {
        this.toUpgradeLevel()
    } else {
      return;
    }
  }

  buttonNewQuizTapped() {
    this.resultActions.emit(2)
  }

  buttonChangeCategoryTapped() {
    this.resultActions.emit(1)
  }

  buttonReviewAnswersTapped() {
      this.areAnswersToBeShown = true
  }

  toUpgradeLevel(){
    var existingUsernames = JSON.parse(localStorage.getItem("usernames"))
      if (existingUsernames != null){
        for (var user of existingUsernames){
          if (user.name == this.currentUser){
            user.promotedAge += 1
          }
        }
      }
    localStorage.setItem("usernames", JSON.stringify(existingUsernames));
  }
}
