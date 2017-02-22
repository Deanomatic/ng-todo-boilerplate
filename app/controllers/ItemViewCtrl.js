"use strict";
app.controller('ItemViewCtrl', function ($scope, $routeParams, ItemStorage){
	$scope.item = [];

	ItemStorage.getItemList()
	.then(function(itemCollection){
		$scope.item = itemCollection;

		$scope.selectedItem = $scope.item.filter(function(item){
			return item.id === $routeParams.itemId;
		})[0];
	});
});
