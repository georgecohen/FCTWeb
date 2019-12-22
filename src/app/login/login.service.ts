
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Customer } from '../models';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class LoginService {
  private currentUserSubject: BehaviorSubject<Customer>;
  public currentUser: Observable<Customer>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Customer {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post(environment.appUrl + 'api/users/authenticate',
      { Email: username, Password: password }).pipe(map((user: Customer) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
