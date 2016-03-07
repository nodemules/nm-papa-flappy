/* global angular */

(function(angular) {
    
    var app = angular.module('flapperNewsApp');
    
    app.factory('Posts', Posts);
    
    Posts.$inject = ['$resource'];
    
    function Posts($resource) {
      
        var service = {
            getPosts : getPosts,
            generatePosts : generatePosts,
            addPost : addPost
        };
        
        service.posts = {
            arr : [],
            get get() {
                return this.arr;
            },
            set set(arr) {
                this.arr = arr;
            }
        };
        
        service.errors = {
            arr : [],
            get get() {
                return this.arr;
            },
            set set(arr) {
                this.arr = arr;
            }
        }
        
        var POST_DATA = [];
        
        return service;
      
        // /\/\/\/\/\// //
      
        function addPost() {
          
        }
        
        function generatePosts(num, callback) {
            
            POST_DATA = getPosts()
                .query(function() {
                    var arr = [];
                
                    while (num > 0) {                                       // Generate a number of posts defined by @num
                        var post = {
                            title : null,
                            path : null
                        };                                                  // Instantiate a new post
                        post.title = getPostData('title');                  // Create a post title from the mocked data
                        post.path = getPostData('path');
                        post.createUser = getPostData('username');
                        post.upvotes = Math.floor(Math.random() * 100);     // Give posts a random number of upvotes between 0 - 100
                        arr.splice(0, 0, post);                             // Insert the post into the $scope.posts array at index 0
                        num--;                                              // Decrement the value of @num
                    }     
                    
                    service.posts.set = arr;                                // set the 
                    if (typeof callback === 'function') {
                        callback(arr);
                    }
                    
                }, function(err) {
                    service.errors.arr.push(err);
                });
                
        }
      
        function getPosts() {
            var path = 'https://www.mockaroo.com/83bf05c0/download?count=1000&key=3fd7b0a0';
            
            return $resource(path);
        }
        
        function getPostData(key) {
            var num = 0;
            num = Math.floor(Math.random() * 1000)
            while (num >= 1000) {
                num--;
            }
            return POST_DATA[num][key];
        }
        
    };
})(angular);