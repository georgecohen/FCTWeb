import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { Error } from '../_services/error.interface';
import { LoggerService } from '../_services/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    async handleError(error: any) {
        const logger = this.injector.get(LoggerService);
        const message = error.message ? error.message : error.toString();
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        // log on the server
        logger.log({ message, url} as Error);
    }
}