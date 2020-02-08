(function () {
    'use strict';

    angular.module('auth', [
        
    ])
    .constant('authConstants', {
        emailRegex: /\S+@\S+\.\S+/,
        mobileRegex: /^[6-9]{1}[0-9]{9,9}$/
    });
})();