"use strict";
//creating function to delete items
app.controller("ItemListCtrl", function($scope, ItemStorage){

    ItemStorage.getItemList()
    .then(function(itemCollection){
        $scope.items = itemCollection;
    }); 

$scope.itemDelete = function(itemId){
        console.log("delete this item", itemId);
        ItemStorage.deleteItem(itemId)
        .then(function(response){
            ItemStorage.getItemList().then(function(itemCollection){
                $scope.items = itemCollection;
            });
        });
    };
});