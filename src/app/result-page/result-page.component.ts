import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-result-page",
  templateUrl: "./result-page.component.html",
  styleUrls: ["./result-page.component.css"]
})
export class ResultPageComponent implements OnInit {
  @Input() arrChildQuiz;
  @Input() userPerformance;
  ageRange: number;
  score: number;
  currentUser: string;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.ageRange = message));
    this.data.currentUser.subscribe(message => (this.currentUser = message));
    this.score = this.userPerformance;
  }

  buttonNewQuizTapped() {
    
  }

  buttonChangeCategoryTapped() {

  }

  buttonReviewAnswersTapped() {
    
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
