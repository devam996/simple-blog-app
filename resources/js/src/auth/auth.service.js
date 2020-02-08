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