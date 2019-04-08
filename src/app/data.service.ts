import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService{

    private messageSource = new BehaviorSubject('default');
    private usernameSource = new BehaviorSubject('User');
    currentMessage = this.messageSource.asObservable();
    currentUser = this.usernameSource.asObservable();

    constructor(){}

    changeMessage(message: string){
        this.messageSource.next(message);
    }
    changeUser(username: string){
        this.usernameSource.next(username);
    }
}