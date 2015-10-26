var App;
(function (App) {
    var Blocks;
    (function (Blocks) {
        var Logging;
        (function (Logging) {
            'use strict';
            angular.module('blocks.logging', []);
        })(Logging = Blocks.Logging || (Blocks.Logging = {}));
    })(Blocks = App.Blocks || (App.Blocks = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Blocks;
    (function (Blocks) {
        var Logging;
        (function (Logging) {
            'use strict';
            var LoggerService = (function () {
                function LoggerService($log) {
                    this.$log = $log;
                }
                // straight to console
                LoggerService.prototype.log = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    this.$log.log(args);
                };
                LoggerService.prototype.error = function (message, data, title) {
                    this.$log.error('Error: ' + message, '\nSummary:', title, '\nDetails:', data);
                };
                LoggerService.prototype.info = function (message, data, title) {
                    this.$log.info('Info: ' + message, '\nSummary:', title, '\nDetails:', data);
                };
                LoggerService.prototype.success = function (message, data, title) {
                    this.$log.info('Success: ' + message, '\nSummary:', title, '\nDetails:', data);
                };
                LoggerService.prototype.warning = function (message, data, title) {
                    this.$log.warn('Warning: ' + message, '\nSummary:', title, '\nDetails:', data);
                };
                LoggerService.$inject = ['$log'];
                return LoggerService;
            })();
            Logging.LoggerService = LoggerService;
            angular
                .module('blocks.logging')
                .service('logger', LoggerService);
        })(Logging = Blocks.Logging || (Blocks.Logging = {}));
    })(Blocks = App.Blocks || (App.Blocks = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Blocks;
    (function (Blocks) {
        var ExceptionHandling;
        (function (ExceptionHandling) {
            'use strict';
            angular.module('blocks.exceptionHandling', ['blocks.logging']);
        })(ExceptionHandling = Blocks.ExceptionHandling || (Blocks.ExceptionHandling = {}));
    })(Blocks = App.Blocks || (App.Blocks = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Blocks;
    (function (Blocks) {
        var ExceptionHandling;
        (function (ExceptionHandling) {
            'use strict';
            var Exception = (function () {
                function Exception(logger) {
                    var _this = this;
                    this.logger = logger;
                    this.catcher = function (message) { return function (reason) { return _this.logger.error(message, reason); }; };
                }
                Exception.$inject = ['logger'];
                return Exception;
            })();
            ExceptionHandling.Exception = Exception;
            angular
                .module('blocks.exceptionHandling')
                .service('exception', Exception);
        })(ExceptionHandling = Blocks.ExceptionHandling || (Blocks.ExceptionHandling = {}));
    })(Blocks = App.Blocks || (App.Blocks = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Blocks;
    (function (Blocks) {
        var ExceptionHandling;
        (function (ExceptionHandling) {
            'use strict';
            var ExceptionHandlerProvider = (function () {
                function ExceptionHandlerProvider() {
                    var _this = this;
                    this.config = {
                        appErrorPrefix: undefined
                    };
                    this.$get = function () { return { config: _this.config }; };
                }
                ExceptionHandlerProvider.prototype.configure = function (appErrorPrefix) {
                    this.config.appErrorPrefix = appErrorPrefix;
                };
                ExceptionHandlerProvider.$inject = [];
                return ExceptionHandlerProvider;
            })();
            ExceptionHandling.ExceptionHandlerProvider = ExceptionHandlerProvider;
            angular
                .module('blocks.exceptionHandling')
                .provider('exceptionHandler', ExceptionHandlerProvider);
        })(ExceptionHandling = Blocks.ExceptionHandling || (Blocks.ExceptionHandling = {}));
    })(Blocks = App.Blocks || (App.Blocks = {}));
})(App || (App = {}));
// Intra-App features such as shared data services
var App;
(function (App) {
    var Core;
    (function (Core) {
        'use strict';
        angular
            .module('app.core', [
            /* Angular modules */
            /* Cross-app modules */
            'blocks.exceptionHandling',
            'blocks.logging',
            /* 3rd-party modules */
            'ionic'
        ]);
    })(Core = App.Core || (App.Core = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Core;
    (function (Core) {
        'use strict';
        var Config = (function () {
            function Config() {
            }
            Config.configure = function ($logProvider, exceptionHandlerProvider) {
                if ($logProvider.debugEnabled) {
                    $logProvider.debugEnabled(true);
                }
                exceptionHandlerProvider.configure(Config.values.appErrorPrefix);
            };
            Config.values = {
                appTitle: 'TaxCalculatorApp',
                appErrorPrefix: '[TaxCalculatorApp Error] '
            };
            return Config;
        })();
        Core.Config = Config;
        angular
            .module('app.core')
            .config(['$logProvider', 'exceptionHandlerProvider', Config.configure])
            .value('config', Config.values);
    })(Core = App.Core || (App.Core = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Core;
    (function (Core) {
        'use strict';
        var Route = (function () {
            function Route() {
            }
            Route.configureStates = function ($stateProvider, $urlRouterProvider) {
                // For any unmatched url, redirect to default
                $urlRouterProvider.otherwise('/calculator');
                // Now set up the states
                $stateProvider
                    .state('calculator', {
                    url: "/calculator",
                    templateUrl: "/templates/calculator.html",
                    controller: 'CalculatorController as vm'
                });
            };
            return Route;
        })();
        Core.Route = Route;
        angular
            .module('app.core')
            .config(['$stateProvider', '$urlRouterProvider', Route.configureStates]);
    })(Core = App.Core || (App.Core = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Layout;
    (function (Layout) {
        'use strict';
        angular.module('app.layout', ['app.core']);
    })(Layout = App.Layout || (App.Layout = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Layout;
    (function (Layout) {
        "use strict";
        var CalculatorController = (function () {
            function CalculatorController($rootScope, config, logger) {
                this.$rootScope = $rootScope;
                this.config = config;
                this.logger = logger;
                this.title = config.appTitle;
                this.valor = 0;
                this.porcentaje = 21;
                this.impuestos = 0;
                this.total = 0;
                this.logger.info(this.title + ' loaded!', null);
            }
            CalculatorController.prototype.onChange = function () {
                try {
                    this.total = parseFloat((this.valor * (1 + this.porcentaje / 100)).toFixed(2));
                    this.impuestos = parseFloat((this.total - this.valor).toFixed(2));
                }
                catch (e) {
                    this.logger.error("onChange", e);
                }
            };
            CalculatorController.prototype.onChangeTotal = function () {
                try {
                    this.valor = parseFloat((this.total / (1 + this.porcentaje / 100)).toFixed(2));
                    this.impuestos = parseFloat((this.total - this.valor).toFixed(2));
                }
                catch (e) {
                    this.logger.error("onChangeTotal", e);
                }
            };
            CalculatorController.$inject = ['$rootScope', 'config', 'logger'];
            return CalculatorController;
        })();
        Layout.CalculatorController = CalculatorController;
        angular
            .module('app.layout')
            .controller('CalculatorController', CalculatorController);
    })(Layout = App.Layout || (App.Layout = {}));
})(App || (App = {}));
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/angularjs/angular-route.d.ts"/>
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts"/>
// main app module
var App;
(function (App) {
    'use strict';
    angular.module('app', [
        /* Shared modules */
        'app.core',
        /* Feature areas */
        'app.layout'
    ]);
})(App || (App = {}));
//# sourceMappingURL=app.js.map