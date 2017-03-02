"use strict"; 
//Object that lets us create new items
app.controller("ItemNewCtrl", function($scope, ItemStorage, $location, AuthFactory){ 

    let user = AuthFactory.getUser();

    $scope.title = "New Todo";
    $scope.btnText = "Submit";
      
	$scope.newTask = {
		assignedTo: "",
		dependencies: "",
		dueDate: "",
		isCompleted: false,
		location: "",
		task: "",
		urgency: "",
        uid: user
	};
//This function allows us to create new ToDo and plug it into the newTask object
	$scope.addNewItem = function(){
        console.log("add new item");
        ItemStorage.postNewItem($scope.newTask)
        .then(function(response){
        	$location.url("items/list");
        });
        // $scope.newTask.isCompleted = false;
        // $scope.newTask.id = $scope.items.length;
        console.log("you added new task:", $scope.newTask);
        // $scope.items.push($scope.newTask);
        $scope.newTask = {};
    };
});