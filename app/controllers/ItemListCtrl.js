"use strict";
//creating function to delete items
app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData, AuthFactory){
    console.log("hola");    
    $scope.searchText = SearchTermData;
    //$scope.items = [];
    let user = AuthFactory.getUser();

    ItemStorage.getItemList(user)
    .then(function(itemCollection){
        $scope.items = itemCollection;
        console.log("yo", $scope.items);
    }); 

    $scope.itemDelete = function(itemId){
        console.log("delete this item", itemId);
        ItemStorage.deleteItem(itemId)
        .then(function(response){
            ItemStorage.getItemList(user).then(function(itemCollection){
                $scope.items = itemCollection;
            });
        });
    };
});