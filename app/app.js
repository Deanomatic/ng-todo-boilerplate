"use strict"; 
//creating an object called app. .angular is making it controlable by angular
//ngRoute allowsus to make these "when" statements like this. It is telling the page where
//to go when something is clicked.
var app = angular.module("ToDoApp", ["ngRoute"])
.constant('FirebaseURL', "https://todo-list-84d8f.firebaseio.com");

//app js runs the show. These conditionals are controlling what is being viewed on the page. 
app.config(function($routeProvider) {
    $routeProvider.
    when('/items/list',{
        templateUrl: "partials/item-list.html",
        controller: 'ItemListCtrl'
    }).
    when("/items/new", {
        templateUrl: "partials/item-form.html",
        controller: "ItemNewCtrl"
    }).
    when("/items/:itemId", {
        templateUrl: "partials/item-details.html",
        controller: "ItemViewCtrl"
    }).
    otherwise('/items/list');

});