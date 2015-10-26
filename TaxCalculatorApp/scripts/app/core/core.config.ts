namespace App.Core {
    'use strict';

    import ExceptionHandlerProvider = Blocks.ExceptionHandling.ExceptionHandlerProvider;

    export class Config {
        public static values = {
            appTitle: 'TaxCalculatorApp',
            appErrorPrefix: '[TaxCalculatorApp Error] '
        };

        static configure($logProvider: ng.ILogProvider, exceptionHandlerProvider: ExceptionHandlerProvider): void {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }

            exceptionHandlerProvider.configure(Config.values.appErrorPrefix);
        }
    }
    
    angular
        .module('app.core')
        .config(['$logProvider', 'exceptionHandlerProvider', Config.configure])
        .value('config', Config.values);
}