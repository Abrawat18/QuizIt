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
    if(this.score<= 0.25){
      this.grade = "B"
    }else if(this.score > 0.25 && this.score <= 0.5){
      this.grade = "B+"
    }else if(this.score > 0.50 && this.score < 0.80){
      this.grade = "A"
    }else{
      this.grade = "A+"
      this.askUserToUpgradeLevel();
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
