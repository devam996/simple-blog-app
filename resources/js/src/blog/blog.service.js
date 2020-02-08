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