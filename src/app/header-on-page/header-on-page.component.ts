import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../global/user';

@Component({
  selector: 'app-header-on-page',
  templateUrl: './header-on-page.component.html',
  styleUrls: ['./header-on-page.component.css']
})
export class HeaderOnPageComponent implements OnInit {
  logo = 'QUIZ-IT';
  ageRange: number;
  username: string;
  usernameToggle: Boolean = false;
  createUserNameBtn: String = "Create username";
  successfullyCreatedUsername: Boolean = true;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.ageRange = message)
    this.data.currentUser.subscribe(username => this.username = username )
  }

  addUserOnClick(usernameInput: string){
    if(!this.usernameToggle){
      this.usernameToggle = !this.usernameToggle;
      this.createUserNameBtn = "Add user";
    }
    else {
      this.usernameToggle = !this.usernameToggle;
      var existingUsernames = JSON.parse(localStorage.getItem("usernames"));
      if (existingUsernames != null){
        for (var user of existingUsernames){
          if (user.name == usernameInput){
            this.successfullyCreatedUsername = !this.successfullyCreatedUsername;
          }
        }
      } else {
        existingUsernames = []
      }
      existingUsernames.push(new User(usernameInput, this.ageRange, this.ageRange));
      localStorage.setItem("usernames", JSON.stringify(existingUsernames));
      this.data.changeUser(usernameInput);
      console.log(usernameInput);
    }
  }

  goToAgeSelect(){
    this.data.changeMessage(0);
    this.data.changeUser("User");
  }
}
