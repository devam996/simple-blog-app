(function () {
    'use strict';

    angular.module('blogApp', [
        'common',
        'auth',
        'blog'
    ]);
})();
(function () {
    'use strict';

    angular.module('auth', [
        
    ])
    .constant('authConstants', {
        emailRegex: /\S+@\S+\.\S+/,
        mobileRegex: /^[6-9]{1}[0-9]{9,9}$/
    });
})();
(function () {
    'use strict';

    angular.module('blog', [
        // Angular modules

        // Custom modules

        // 3rd Party Modules

    ]);
})();
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
(function(){
    'use strict';

    angular
        .module('common')
        .config(commonConfig)

    commonConfig.$inject = ['$mdThemingProvider','$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider'];

    function commonConfig($mdThemingProvider, $urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {
        const themePalette = {
            primary: "blue",
			accent: "amber",
			warn: "red"
        };

        $mdThemingProvider.theme('default')
			.primaryPalette(themePalette.primary)
			.accentPalette(themePalette.accent)
			.warnPalette(themePalette.warn);

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
        });
        
        // $httpProvider.interceptors.push('authInterceptor');

        $stateProvider
        //----Layouts----//
        .state('outside', {
            abstract: true,
            templateUrl: '/templates/layouts/outside.html'
        })
        .state('inside', {
            abstract: true,
            templateUrl: '/templates/layouts/inside.html',
            // controller: 'LayoutController as layoutCtrl'
        })
        .state('auth', {
            url: '/',
            parent: 'outside',
            // controller: 'AuthController as authCtrl',
            templateUrl: '/templates/pages/outside/auth.html'
        });


    }

}());