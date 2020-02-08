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
        
        $httpProvider.interceptors.push('authInterceptor');

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
            controller: 'authController as authCtrl',
            templateUrl: '/templates/pages/outside/auth.html'
        })
        .state('blog-add', {
            url: '/blogs/add',
            parent: 'inside',
            controller: 'addBlogController as addBlogCtrl',
            templateUrl: '/templates/pages/inside/blog-add.html'
        })
        .state('blog-list', {
            url: '/blogs',
            parent: 'inside',
            controller: 'blogController as blogCtrl',
            templateUrl: '/templates/pages/inside/blogs.html'
        });


    }

}());