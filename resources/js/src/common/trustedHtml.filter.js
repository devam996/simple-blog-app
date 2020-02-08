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