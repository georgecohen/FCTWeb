import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Error } from './error.interface';

@Injectable()
export class LoggerService {
    private subject = new Subject<Error>();
    error$: Observable<Error> = this.subject.asObservable();

    constructor() { }

    log(error: Error) {
        console.log('Logger', error);
        this.subject.next(error);
    }
}