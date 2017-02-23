"use strict";
app.controller('ItemViewCtrl', function ($scope, $routeParams, ItemStorage, AuthFactory){
	$scope.item = [];

	let user = AuthFactory.getUser();

	ItemStorage.getItemList(user)
	.then(function(itemCollection){
		$scope.item = itemCollection;

		$scope.selectedItem = $scope.item.filter(function(item){
			return item.id === $routeParams.itemId;
		})[0];
	});
});
