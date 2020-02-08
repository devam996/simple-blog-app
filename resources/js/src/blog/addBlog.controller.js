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