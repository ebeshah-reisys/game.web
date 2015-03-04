// Code goes here


(function() {

  var app = angular.module("gameAppWeb", ['ngRoute']).
  config(function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'basicView.html',
      controller: AboutController
    }).
    when('/user', {
      templateUrl: 'manageUser.htm',
      controller: UserController
    }).
    otherwise({
      redirectTo: '/home',
      templateUrl: 'basicView.html',
      controller: HomeController
    });
  });
  var MainController = function($scope, $http, $interval, $log,
    $anchorScroll, $location) {

    $scope.message = "Hello angular!";


    var onError = function(reason) {
      $log.error("something went wrong " + reason.status);
      $scope.error = "Something went wrong with the request! " + reason.statusText;
    };



    $scope.getUsers = function() {
      $log.info("Getting list of users ..." );

      $http.get($scope.apiurl).then(onGetUsersComplete, onError);

    };
    var onGetUsersComplete = function(response) {
      $scope.users = response.data;
              
    };
    $scope.setRoute = function(route) {
      $location.path(route);
      $scope.viewId = route == 'home' ? 0 : null;
    }
	
	$scope.apiurl = "http://localhost:91/user";
    $scope.message = "Github Viewer";
    $scope.username = "angular";
    $scope.repoSortOrder = "-stargazers_count";
  };

  var AboutController = function($scope, $http, $interval, $log,
    $anchorScroll, $location) {
    $scope.title = 'About Page Title';
    $scope.body = 'This is content from the about page in a single page application.';
  };

  var HomeController = function($scope, $http, $interval, $log,
    $anchorScroll, $location) {
    $scope.title = 'Home Page Title';
    $scope.body = 'This is content from the home page in a single page application.';
  };

  var UserController = function($scope, $http, $interval, $log,
    $anchorScroll, $location) {
	$scope.displayForm=true;		
    $scope.title = 'Weathehr Page Title';
    $scope.body = 'This is content from the about page in a single page application.';
    $scope.getUsers();
function resetItem(){
   $scope.user = {
      name : '',
      email : '',
      phone : '',
      id : ''
   };             
   $scope.displayForm = '';
   
}
resetItem();
	
	 $scope.addItem = function () {
	   resetItem();
	   $scope.displayForm = true;
	 };	
	$scope.saveItem = function () {
	  var usr = $scope.user;
		  if (usr.id.length == 0){
				$http.get($scope.apiurl +'/create?name=' + usr.name + '&email=' +  usr.email + '&phone=' +  usr.phone).success(function(data) {
				  $scope.users.push(data);
				  $scope.displayForm = '';
				  removeModal();
				}).
	  error(function(data, status, headers, config) {
		alert(data.summary);
	  });
			  }
			  else{
				$http.get($scope.apiurl +'/update/'+ usr.id +'?name=' + usr.name + '&email=' +  usr.email + '&phone=' +  usr.phone).success(function(data) {
				  $scope.displayForm = '';
				  removeModal();
				}).
	  error(function(data, status, headers, config) {
		alert(data.summary);
	  });
			  }
			};	
 
$scope.editItem = function (data) {      
        $scope.user = data;
        $scope.displayForm = true;
}
       function removeModal(){
          $('.modal').modal('hide');         
      }	

        $scope.removeItem = function (data) {
          if (confirm('Do you really want to delete?')){
            $http['delete']($scope.apiurl +'/' + data.id).success(function() {
              $scope.users.splice($scope.users.indexOf(data), 1);
            });
          }
        };
 
        $http.get($scope.apiurl +'/find').success(function(data) {
          for (var i = 0; i < data.length; i++) {
            data[i].index = i;
          }
          $scope.users = data;
        });	  
	  
  };


  app.controller("MainController", ["$scope", "$http", "$interval", "$log", "$anchorScroll", "$location", MainController]);
  app.controller("HomeController", ["$scope", "$http", "$interval", "$log", "$anchorScroll", "$location", HomeController]);
  app.controller("AboutController", ["$scope", "$http", "$interval", "$log", "$anchorScroll", "$location", AboutController]);
  app.controller("UserController", ["$scope", "$http", "$interval", "$log", "$anchorScroll", "$location", UserController]);
}());