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