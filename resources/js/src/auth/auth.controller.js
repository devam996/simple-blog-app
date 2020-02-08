
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