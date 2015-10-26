namespace App.Blocks.ExceptionHandling {
    'use strict';

    export interface IExceptionHandlerConfig {
        appErrorPrefix: string
    }

    export class ExceptionHandlerProvider {
        static $inject: Array<string> = [];
        constructor() { }

        config: IExceptionHandlerConfig = {
            appErrorPrefix: undefined
        }

        configure(appErrorPrefix: any) {
            this.config.appErrorPrefix = appErrorPrefix;
        }

        $get: () => { config: IExceptionHandlerConfig } = () => { return { config: this.config }; }
    }

    angular
        .module('blocks.exceptionHandling')
        .provider('exceptionHandler', ExceptionHandlerProvider);
}