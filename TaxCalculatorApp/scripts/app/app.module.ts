/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/angularjs/angular-route.d.ts"/>
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts"/>

// main app module
namespace App {
    'use strict';

    angular.module('app', [
        /* Shared modules */
        'app.core',
        /* Feature areas */
        'app.layout'
    ]);
}