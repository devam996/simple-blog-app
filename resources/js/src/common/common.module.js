(function () {
    'use strict';

    angular.module('common', [
        // Angular modules
        'ngAria',
        'ngAnimate',
        'ngMessages',
        'ngSanitize',
        'ngRoute',

        // Custom modules
        

        // 3rd Party Modules
        'ui.router',
        'ngMaterial',
        'validation.match',
        'ngQuill'
    ])
    .constant('_', _)
    .constant('store', store)
    .constant('moment', moment);
})();