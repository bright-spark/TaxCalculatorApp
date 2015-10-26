// Intra-App features such as shared data services
namespace App.Core {
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
}