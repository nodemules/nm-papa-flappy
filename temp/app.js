/* global angular */

(function(angular) {

    var app = angular.module('flapperNewsApp', ['CONSTANTS']);
    
    app.controller('MainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['$scope', '$http', 'MOCK_DATA'];
    
    function MainCtrl($scope, $http, MOCK_DATA) {
        
        $scope.ready = false;
        
        $scope.title = 'Flappy posts!';
        
        $scope.posts = [];
        
        var POST_DATA = [];
        
        /*
         * PUBLIC FUNCTIONS
         */
        
        $scope.generatePosts = function(num) {
            generatePosts(num);
        }
        
        $scope.addPost = function(post) {
            var num = $scope.posts.length;
            post.upvotes = Math.floor(Math.random() * 100);
            post.createUser = 'testUser'
            
            $scope.posts.push(post);
            $scope.newPost = null;
        }
        
        $scope.upVote = function(post) {
            post.upvotes += 1;
        }
        
        /*
         * PRIVATE FUNCTIONS
         */
        
        function initCtrl() {
            getPosts();
        }
        
        function generatePosts(num) { 
            while (num > 0) {                                                   // Generate a number of posts defined by @num
                var post = {
                    title : null,
                    path : null
                };                                                  // Instantiate a new post
                post.title = getPostData('title');                              // Create a post title from the mocked data
                post.path = getPostData('path');
                post.createUser = getPostData('username');
                post.upvotes = Math.floor(Math.random() * 100);                 // Give posts a random number of upvotes between 0 - 100
                $scope.posts.splice(0, 0, post);                                // Insert the post into the $scope.posts array at index 0
                num--;                                                          // Decrement the value of @num
            }                                                   // Update $scope when the function is finished
        }
        
        function getPostData(key) {
            var num = 0;
            num = Math.floor(Math.random() * 1000)
            while (num >= 1000) {
                num--;
            }
            return POST_DATA[num][key];
        }
        
        function getPosts() {
            var path = 'https://www.mockaroo.com/83bf05c0/download?count=1000&key=3fd7b0a0';
            $http.get(path)
                .then(function(data) {
                    POST_DATA = data.data;
                    generatePosts(25);
                    $scope.ready = true;
                }, function(err) {
                    console.log(err);
                })
        }
        
        angular.element(document).ready(function() {
            initCtrl();
        })
        
    };
    
})(angular);