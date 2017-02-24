"use strict";
//This is binding key value pairs to the nav bar. Nav controller is being injected and then evaluated.
// 
app.controller("NavCtrl", function($scope, $window, SearchTermData){ 
    $scope.searchText = SearchTermData;
    $scope.isLoggedIn = false; 

    firebase.auth().onAuthStateChanged(function(user){
    	if (user) {
    		$scope.isLoggedIn = true;
    		console.log("Logged In???");

    	}else{
    		$scope.isLoggedIn = false;
    		$window.locationhref = "#!/login";
    		console.log("Logged in or naw??");
    	}
    });

});