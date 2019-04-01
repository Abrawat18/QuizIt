import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../main-age-selector/user';

@Component({
  selector: 'app-header-on-page',
  templateUrl: './header-on-page.component.html',
  styleUrls: ['./header-on-page.component.css']
})
export class HeaderOnPageComponent implements OnInit {
  logo = 'QUIZ-IT';
  ageRange: string;
  username = 'User';
  usernameToggle: Boolean = false;
  createUserNameBtn: String = "Create username";
  successfullyCreatedUsername: Boolean = true;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message)
  }

  addUserOnClick(usernameInput: string){
    if(!this.usernameToggle){
      this.usernameToggle = !this.usernameToggle;
      this.createUserNameBtn = "Add user";
    }
    else {
      this.usernameToggle = !this.usernameToggle;
      var existingUsernames = JSON.parse(localStorage.getItem("usernames"));
      console.log(existingUsernames);
      if (existingUsernames != null){
        console.log("1");
        for (var user of existingUsernames){
          if (user.name == usernameInput){
            console.log("2");
            this.successfullyCreatedUsername = !this.successfullyCreatedUsername;
          }
        }
      } else {
        console.log("3");
        existingUsernames = []
      }
      console.log("4");
      existingUsernames.push(new User(usernameInput, this.ageRange));
      localStorage.setItem("usernames", JSON.stringify(existingUsernames));
      console.log(usernameInput);
    }
  }
}
