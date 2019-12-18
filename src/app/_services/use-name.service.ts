import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models';


@Injectable()
export class UserNameService {
    private clientUserNameSource = new BehaviorSubject('');

    currentClient$ = this.clientUserNameSource.asObservable();

    constructor(
    ) {
        this.getClient();
    }

    getClient() {
        //let usernameString = localStorage.getItem('currentClient');
        //if (usernameString) {
        //    let user = JSON.parse(usernameString);

        //    this.clientUserNameSource.next(user);
        //} else {
        //    this.clientUserNameSource.next({ email: '', full_name: '', isLoggedin: false, status: 0 });
        //}

        const username = localStorage.getItem('currentClient');
        if (username)
            this.clientUserNameSource.next(username);
        else
            this.clientUserNameSource.next('');
    }
    
    setClient(username: string) {
        localStorage.setItem('currentClient', username);
        this.clientUserNameSource.next(username);
    }
}
