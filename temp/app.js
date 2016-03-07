/* global angular */

(function(angular) {

    var app = angular.module('flapperNewsApp', ['ngResource', 'ui.router']);
    
    app.controller('MainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['$scope', '$http', 'Posts'];
    
    function MainCtrl($scope, $http, Posts) {
        
        $scope.ready = false;
        
        $scope.title = 'Flappy posts!';
        
        $scope.posts = [];
        
        $scope.$watch(function() {
            return Posts.posts.get;
        }, function(n,o) {
            $scope.posts = n;
        });
        
        $scope.$watch(function() {
            return Posts.errors.get;
        }, function(n, o) {
            $scope.errors = n;
        })
        
        $scope.errors = [];
        
        var POST_DATA = [];
        
        /*
         * PUBLIC FUNCTIONS
         */
        
        $scope.generatePosts = function(num) {
            Posts.generatePosts(num);
        };
        
        $scope.addPost = function(post) {
            post.upvotes = Math.floor(Math.random() * 100);
            post.createUser = 'testUser';
            
            $scope.posts.push(post);
            $scope.newPost = null;
        };
        
        $scope.upVote = function(post) {
            post.upvotes += 1;
        };
        
        /*
         * PRIVATE FUNCTIONS
         */
        
        function initCtrl() {
            Posts.generatePosts(25, function(data) {
                $scope.ready = true;
            });
        }
        
        angular.element(document).ready(function() {
            initCtrl();
        });
        
    }
    
})(angular);