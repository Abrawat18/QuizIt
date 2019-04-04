import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-custom-quiz',
  templateUrl: './custom-quiz.component.html',
  styleUrls: ['./custom-quiz.component.css']
})
export class CustomQuizComponent implements OnInit {
  @Input() allCustom;
  ageRange: string;
  flag = true;
  private questions: any = [];
  private customQuiz: any = [];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message);
  }
  public loadCustomQuiz(fileName) {
    this.flag = false;
    this.questions = this.loadLanguage(fileName);
    this.customQuiz.push(this.questions.questions);
    console.log(this.customQuiz);
  }
  public loadLanguage(lang: string) {
    // @ts-ignore
    return require('../../assets/data/' + lang + '.json');
  }
}
