"use strict";

app.controller('TodoCtrl', function($scope, $location){
    $scope.welcome = "hello";
    $scope.showListView = true;
    $scope.NewTask = {};


    $scope.newItem = function(){
        console.log("you clicked new item");
        //$scope.showListView = false;
        $location.url("/items/new");
    };

    $scope.allItem = function(){
        console.log("you clicked on show all items");
        //$scope.showListView = true;
        $location.url("/items/list");
    };

});