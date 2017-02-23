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

	return {getItemList, postNewItem, deleteItem};
});