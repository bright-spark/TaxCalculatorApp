﻿namespace App.Blocks.Logging {
    'use strict';

    export interface ILoggerService {
        info: (message: string, data?: {}, title?: string) => void;
        error: (message: string, data?: {}, title?: string) => void;
        success: (message: string, data?: {}, title?: string) => void;
        warning: (message: string, data?: {}, title?: string) => void;
        log: (...args: any[]) => void;
    }

    export class LoggerService implements ILoggerService {
        static $inject: Array<string> = ['$log'];
        constructor(private $log: ng.ILogService) { }

        // straight to console
        log(...args: any[]): void {
            this.$log.log(args);
        }

        error(message: string, data?: {}, title?: string): void {
            this.$log.error('Error: ' + message, '\nSummary:', title, '\nDetails:', data);
        }

        info(message: string, data?: {}, title?: string): void {
            this.$log.info('Info: ' + message, '\nSummary:', title, '\nDetails:', data);
        }

        success(message: string, data?: {}, title?: string): void {
            this.$log.info('Success: ' + message, '\nSummary:', title, '\nDetails:', data);
        }

        warning(message: string, data?: {}, title?: string): void{
            this.$log.warn('Warning: ' + message, '\nSummary:', title, '\nDetails:', data);
        }
    }

    angular
        .module('blocks.logging')
        .service('logger', LoggerService);
}