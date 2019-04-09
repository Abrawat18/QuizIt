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

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.ageRange = message));
    this.score = 10;
  }

  buttonNewQuizTapped() {}

  buttonChangeCategoryTapped() {}

  buttonReviewAnswersTapped() {}
}
