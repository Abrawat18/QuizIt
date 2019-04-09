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

  child(username: string) {
    this.data.changeMessage("child");
    this.data.changeUser(username);
    this.compVisible = false;
  }
  teen(username: string) {
    this.data.changeMessage("teen");
    this.data.changeUser(username);
    this.compVisible = false;
  }
  adult(username: string) {
    this.data.changeMessage("adult");
    this.data.changeUser(username);
    this.compVisible = false;
  }
  onEnterUsername(value: string){
    var existingUsernames = JSON.parse(localStorage.getItem("usernames"));
    if(existingUsernames != null){
      for (var user of existingUsernames){
        if (user.name == value && user.age == "child"){
          this.child(user.name);
        } else if (user.name == value && user.age == "teen"){
          this.teen(user.name);
        } else if (user.name == value && user.age == "adult"){
          this. adult(user.name);
        }
      }
    }
  }
}
