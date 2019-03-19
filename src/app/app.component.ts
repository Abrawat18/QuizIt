import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  logo = 'QUIZ-IT';
  ageRange: string;

  constructor(private data: DataService){}

  ngOnInit(){
    this.data.currentMessage.subscribe(message => this.ageRange = message);
  }

}
