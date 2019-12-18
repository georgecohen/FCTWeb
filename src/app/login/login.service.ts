
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoginResponse, Customer } from '../models';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) {
    }


    login(username: string, password: string) {
        return this.http.post(environment.appUrl + 'api/Auth',
        { Email: username, Password: password }).pipe(map((response: LoginResponse) => {
            if (response.isLoggedIn) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', response.name);
                this.setUser(response.user);

            }
            return response.status;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        this.setUser(null);

    }

    setUser(user: Customer) {
        if (user) {
            localStorage.setItem('LoggedUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('LoggedUser');
        }
    }
}
