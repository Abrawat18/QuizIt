import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-age-selector',
  templateUrl: './main-age-selector.component.html',
  styleUrls: ['./main-age-selector.component.css']
})

export class MainAgeSelectorComponent implements OnInit {
  ageRange: number;
  compVisible = true;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  child(username: string) {
    this.data.changeMessage(1);
    this.data.changeUser(username);
    this.compVisible = false;
  }
  teen(username: string) {
    this.data.changeMessage(2);
    this.data.changeUser(username);
    this.compVisible = false;
  }
  adult(username: string) {
    this.data.changeMessage(3);
    this.data.changeUser(username);
    this.compVisible = false;
  }
  onEnterUsername(value: string){
    var existingUsernames = JSON.parse(localStorage.getItem("usernames"));
    if(existingUsernames != null){
      for (var user of existingUsernames){
        if (user.name == value && user.age == 1){
          this.child(user.name);
        } else if (user.name == value && user.age == 2){
          this.teen(user.name);
        } else if (user.name == value && user.age == 3){
          this. adult(user.name);
        }
        else {
          confirm("Username does not exist, kindly select your age category to continue..!!")
          return;
        }
      }
    } else {
      confirm("Username does not exist, kindly select your age category to continue..!!")
      return;
    }
  }
}
