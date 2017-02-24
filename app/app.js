"use strict"; 
//creating an object called app. .angular is making it controlable by angular
//ngRoute allows us to make these "when" statements like this. It is telling the page where
//to go when something is clicked.
var app = angular.module("ToDoApp", ["ngRoute"]);
//.constant('FirebaseURL', "https://todo-list-84d8f.firebaseio.com");
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated() 
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});

//app js runs the show. These conditionals are controlling what is being viewed on the page. 
app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: "partials/login.html",
        controller: "UserCtrl"
    }).
    when("/login", {
        templateUrl: "partials/login.html",
        controller: "UserCtrl"
    }).
    when("/logout", {
        templateUrl: "partials/login.html",
        contoller: "UserCtrl"
    }).
    when('/items/list',{//when items/list is true, then show this partial with this controller being used.
        templateUrl: "partials/item-list.html",
        controller: 'ItemListCtrl'
    }).
    when("/items/new", {
        templateUrl: "partials/item-form.html",
        controller: "ItemNewCtrl",
        resolve: {isAuth}
    }).
    when("/items/:itemId", {
        templateUrl: "partials/item-details.html",
        controller: "ItemViewCtrl",
        resolve: {isAuth}
    }).
    when("/items/:itemId/edit", {
        templateUrl: "partials/item-form.html",
        controller: "ItemEditCtrl",
        resolve: {isAuth}
    }).
    otherwise('/');

});

//run this right when the app loads
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});