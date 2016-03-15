/* global angular */

(function(angular) {

    var app = angular.module('flapperNewsApp');
    
    app.controller('MainCtrl', MainCtrl);
    
    app.controller('PostsCtrl', PostsCtrl);
    
    MainCtrl.$inject = ['$scope', '$http', 'Posts'];
    
    function MainCtrl($scope, $http, Posts) {
        
        $scope.ready = false;
        
        $scope.title = 'Flappy posts!';
        
        $scope.posts = [];
        
        $scope.$watch(function() {
            return Posts.posts.get;
        }, function(n,o) {
            if (n == o && n.length === 0) {
                initCtrl();
            } else {
                $scope.ready = true;
            }
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
            post.comments = [];
            post.id = $scope.posts.length;
            
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
        
        // initCtrl();
        
    }
    
    PostsCtrl.$inject = ['$scope', '$filter', '$stateParams', 'Posts'];
    
    function PostsCtrl($scope, $filter, $stateParams, Posts) {
        
        $scope.$watch(function() {
            return Posts.posts.get[$stateParams.id];
        }, function(n,o) {
            $scope.post = Posts.posts.get[$stateParams.id];
        })
        
        $scope.addComment = function(comment) {
            comment.upvotes = Math.floor(Math.random() * 10);
            comment.author = 'testUser';
            comment.id = $scope.post.comments.length;
            
            $scope.post.comments.push(comment);
            $scope.comment = null;
        }
        
    }
    
})(angular);