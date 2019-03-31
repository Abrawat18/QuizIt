import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-age-selector',
  templateUrl: './main-age-selector.component.html',
  styleUrls: ['./main-age-selector.component.css']
})
export class MainAgeSelectorComponent implements OnInit {
  ageRange: string;
  compVisible = true;
  constructor(private data: DataService) { }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.ageRange = message)
  }

  child() {
    this.data.changeMessage('child');
    this.compVisible = false;
  }
  teen() {
    this.data.changeMessage('teen');
    this.compVisible = false;
  }
  adult() {
    this.data.changeMessage('adult');
    this.compVisible = false;
  }

}
