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
