namespace App.Blocks.ExceptionHandling {
    'use strict';
    import LoggerService = Blocks.Logging.LoggerService;

    export interface IException {
        catcher: (message: string) => (reason: string) => void;
    }

    export class Exception implements IException {
        static $inject: Array<string> = ['logger'];
        constructor(private logger: LoggerService) { }

        catcher = (message: string) => (reason: string) => this.logger.error(message, reason);
    }

    angular
        .module('blocks.exceptionHandling')
        .service('exception', Exception);
}