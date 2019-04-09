import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService{

    private ageSource = new BehaviorSubject(0);
    private usernameSource = new BehaviorSubject('User');
    currentMessage = this.ageSource.asObservable();
    currentUser = this.usernameSource.asObservable();

    constructor(){}

    changeMessage(message: number){
        this.ageSource.next(message);
    }
    changeUser(username: string){
        this.usernameSource.next(username);
    }
}