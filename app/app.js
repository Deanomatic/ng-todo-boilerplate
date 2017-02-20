"use strict";
//creating an object called app. 
var app = angular.module("ToDoApp", ["ngRoute"]);
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
    when("/items/details", {
        templateUrl: "partials/item-details.html",
        controller: "ItemViewCtrl"
    }).
    otherwise('/items/list');

});