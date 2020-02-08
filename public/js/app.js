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
(function(){
    'use strict';

    angular
        .module('auth')
        .factory('authService', authService)

    authService.$inject = ['$http', 'store', '$rootScope', '$window'];

    function authService($http, store, $rootScope, $window) {
        var service = {
            login: login,
            register: register
        };

        checkLoggedIn();

        return service;

        function login(userData) {
            return $http.post('/api/login', {user: userData})
                .then(authSuccess);
        }

        function register(userData) {
            return $http.post('/api/register', {user: userData})
                .then(authSuccess);
        }

        function authSuccess(response) {
            console.log('response',response);
            var token = response.data.token;
            setUserData(token);
            store.set('auth_token', token);
            return response.data;
        }

        function setUserData(token) {
            var userData = decryptToken(token);
            store.set('user_data', userData);
            $rootScope.user = userData;
            $rootScope.loggedIn = true;
        }

        function decryptToken(token) {
            var payload = token.split('.')[1];
            var tokenData = $window.atob(payload);
            var data = JSON.parse(tokenData);
            return data;
        }

        function checkLoggedIn() {
            var userData = store.get('user_data');
            var userToken = store.get('auth_token');
            if(angular.isDefined(userToken) && angular.isDefined(userData) && userData.id > 0){
                $rootScope.user = userData;
                $rootScope.loggedIn = true;
            }
        }
    }
})();
(function() {
	'use strict';

	angular
		.module('common')
		.factory('authInterceptor', authInterceptor);

	authInterceptor.$inject = ['store', '$q', '$location'];

	function authInterceptor(store, $q, $location) {

		var service = {
			request: request,
			requestError: requestError,
			response: response,
			responseError: responseError
		};

		// $httpProvider.interceptors.push('authInterceptor');

		return service;

		function getToken() {
			if (store.get('auth_token')) {
				return store.get('auth_token');
			} else {
				return null;
			}
		}

		function request(config) {

			var token = getToken();
			console.log(token);
			if (token !== null) {
				config.headers['Authorization'] = token;
			}
			// //console.log(config);
			return config;
		}

		function requestError(rejection) {
			// //console.log("Request Rejection",rejection);
			return $q.reject(rejection);
		}

		function response(response) {
			// console.log("response",response);
			return response || $q.when(response);
		}

		function responseError(rejection) {
			// console.log("response rejection", rejection);
			if (rejection.status == 403) {
				store.clearAll();
				$location.path('/');
			}

			console.log(rejection.status);
			console.log(rejection);

			if (rejection.status == 503) {
                // toastService.showToast(rejection.data.message, 'error');
                alert(rejection.data.message);
			}
			return $q.reject(rejection);
		}
	}
})();

(function(){
    'use strict';

    angular
        .module('blog')
        .factory('blogService', blogService)

    blogService.$inject = ['$http'];

    function blogService($http) {
        var service = {
            textToSlug: textToSlug,
            saveBlog: saveBlog,
            getBlogs: getBlogs
        };

        return service;

        function textToSlug(text){
            text = text.replace(/^\s+|\s+$/g, ''); // trim
            text = text.toLowerCase();
          
            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaeeeeiiiioooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }
        
            text = text.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes
        
            return text;
        }

        function saveBlog(blogData) {
            return $http.post('/api/blogs/add', {blog: blogData});
        }

        function getBlogs(){
            return $http.get('/api/blogs/list');
        }
    }
})();
(function(){
    'use strict';

    angular
        .module('common')
        .filter('trustedHtml', trustedHtml)

    trustedHtml.$inject = ['$sce']
    function trustedHtml($sce){

        return trustedHtmlFilter;

        function trustedHtmlFilter(input){
            return $sce.trustAsHtml(input);
        }
    }

}());

(function(){
    'use strict';

    angular
        .module('auth')
        .controller('authController', authController)

    authController.$inject = ['authService', '$scope', 'authConstants', '$rootScope', '$state'];

    function authController(authService, $scope, authConstants, $rootScope, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.user_login = {};
        vm.user_register = {};
        vm.emailRegex = authConstants.emailRegex;
        vm.mobileRegex = authConstants.mobileRegex;

        angular.extend(vm, {
            login: login,
            register: register
        });

        activate();

        function activate() { 
            if($rootScope.loggedIn){
                $state.go('blog-list');
            }
        }

        function login() {
            if($scope.loginForm.$invalid){
                return 0;
            }

            vm.loginRequest = true;
            return authService.login(vm.user_login)
                .then(loginSuccess)
                .catch(loginFailure);
        }

        function loginSuccess(data) {
            console.log("LOGIN SUCCESSFUL");
            vm.loginRequest = false;
            vm.registerRequest = false;
            $state.go('blog-list');
        }

        function loginFailure(error) {
            vm.loginRequest = false;
            vm.registerRequest = false;
            console.log('LOGIN FAIL',error);
        }

        function register() {
            if($scope.registerForm.$invalid){
                return 0;
            }

            vm.registerRequest = true;
            return authService.register(vm.user_register)
                .then(loginSuccess)
                .catch(loginFailure);
        }   
    }
})();
(function(){
    'use strict';

    angular
        .module('blog')
        .controller('addBlogController', addBlogController)

    addBlogController.$inject = ['blogService', '$scope', '$state'];

    function addBlogController(blogService, $scope, $state) {
        /* jshint validthis:true */
        var vm = this;

        angular.extend(vm, {
            saveBlog: saveBlog,
            autoLoadSlug: autoLoadSlug,
            blog: {
                keywords: []
            }
        })

        activate();

        function activate() {

        }

        function autoLoadSlug(){
            if(vm.blog.title){
                vm.blog.slug = blogService.textToSlug(vm.blog.title);
            }
        }

        function saveBlog(status) {
            if($scope.addBlogForm.$invalid){
                angular.forEach($scope.addBlogForm.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    })
                })
            } else {
                if(vm.blog.keywords.length && angular.isArray(vm.blog.keywords)){
                    vm.blog.keywords = vm.blog.keywords.join(',');
                } else {
                    vm.blog.keywords = '';
                }

                vm.blog.status = status;

                return blogService.saveBlog(vm.blog)
                    .then(saveBlogSuccess)
                    .catch(saveBlogFailure);
            }
        }

        function saveBlogSuccess(response) {
            console.log('====================================');
            console.log("BLOG CREATED", response);
            console.log('====================================');
            $state.go('blog-list');
        }

        function saveBlogFailure(error) {
            
        }

        
    }
})();
(function(){
    'use strict';

    angular
        .module('blog')
        .controller('blogController', blogController)

    blogController.$inject = ['blogService'];

    function blogController(blogService) {
        /* jshint validthis:true */
        var vm = this;
        vm.blogs = [];

        activate();

        function activate() { 
            return blogService.getBlogs()
                .then(getBlogsSuccess)
                .catch(getBlogsFailure);
        }

        function getBlogsSuccess(response) {
            console.log('====================================');
            console.log("BLOGS found successfully", response);
            console.log('====================================');
            vm.blogs = response.data.data;
        }

        function getBlogsFailure(error) {
            console.log('====================================');
            console.log("EROR", error);
            console.log('====================================');
        }
    }
})();