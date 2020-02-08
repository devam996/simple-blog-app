(function(){
    'use strict';

    angular
        .module('common')
        .config(commonConfig)

    commonConfig.$inject = ['$mdThemingProvider','$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider'];

    function commonConfig($mdThemingProvider, $urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {
        const themePalette = {
            primary: "green",
			accent: "orange",
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
        .state('login', {
            url: '/login',
            parent: 'outside',
            // controller: 'LoginController as loginCtrl',
            templateUrl: '/templates/pages/outside/login.html'
        });


    }

}());