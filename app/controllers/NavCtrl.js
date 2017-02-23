"use strict";
//This is binding key value pairs to the nav bar. Nav controller is being injected and then evaluated.
// 
app.controller("NavCtrl", function($scope, $window, SearchTermData){
    $scope.searchText = SearchTermData;
    $scope.isLoggedIn = false;
});