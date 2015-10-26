namespace App.Core {
    'use strict';

    export class Route {

        static configureStates($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.route.IRouteProvider): void {
            // For any unmatched url, redirect to default
            $urlRouterProvider.otherwise('/calculator');

            // Now set up the states
            $stateProvider
                .state('calculator', {
                    url: "/calculator",
                    templateUrl: "/templates/calculator.html",
                    controller: 'CalculatorController as vm'
                });
        }
    }

    angular
        .module('app.core')
        .config(['$stateProvider', '$urlRouterProvider', Route.configureStates]);
}