(function(){
    'use strict';

    angular
        .module('common')
        .controller('layoutController', layoutController)

    layoutController.$inject = ['authService'];

    function layoutController(authService) {
        /* jshint validthis:true */
        var vm = this;

        angular.extend(vm, {
            logout
        });
        activate();

        function activate() { }
    }
})();