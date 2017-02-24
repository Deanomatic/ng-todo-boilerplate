"use strict";
//What is a factory for?

// In AngularJS, services are reusable singleton objects that are used to organize and share code across your app. 
// They can be injected into controllers, filters, directives. AngularJS provides you three ways : service, factory and 
// provider to create a service. A factory is a simple function which allows you to add some logic before creating 
// the object. It returns the created object.

app.factory("ItemStorage", (FBCreds, $q, $http, AuthFactory) => {
	console.log("hi");

	let user = AuthFactory.getUser();
	
	let getItemList = () => {
		let items = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
			.then((itemObject) => {
				let itemCollection = itemObject.data;
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					items.push(itemCollection[key]);	
				});
				resolve(items);
				console.log("items", items);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let postNewItem = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/items.json`,
				JSON.stringify(newItem))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let deleteItem = (itemId) => {
		console.log("delete the factory", itemId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/items/${itemId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			});
		});
	};

	var getSingleItem = (itemId)=> {
		return $q(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/items/${itemId}.json`)
			.then(function(itemObject){
				resolve(itemObject.data);
			})
			.catch(function(error){
				reject(error);
			});

		});
	};

	var updateItem = (itemId, editedItem) => {
		return $q(function(resolve, reject){
			$http.patch(`${FBCreds.databaseURL}/items/${itemId}.json`,
				//angular.toJson(editedItem) is to get rid of all the extra characters.
			angular.toJson(editedItem))
			.then(function(ObjectFromFirebase){
				resolve(ObjectFromFirebase);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	return {getItemList, postNewItem, deleteItem, getSingleItem, updateItem};
});