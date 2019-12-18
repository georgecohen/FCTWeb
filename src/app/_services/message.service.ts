import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    private getMessageUrl = environment.appUrl + 'api/message';

    constructor(private http: HttpClient) { }

    getMessages(): Promise<Message[]> {
        const url = `${this.getMessageUrl}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response as Message[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        throw new Error(error.message);
    }
}

