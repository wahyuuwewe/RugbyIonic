angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$http','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $ionicLoading) {
	
$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	$http({
		method: "GET",
		url: "https://ri-admin.azurewebsites.net/indonesianrugby/news/list.json"
	}).then(function(data){
		
		$ionicLoading.hide();	
		
		
			
		var html = '';
		for(var i = 0;i<data.data.length;i++){
			html += '<article>\n';
			html += '<img class="full" src="' + data.data[i].img + '">\n';
			html += '<b>' + data.data[i].title + '</b>\n';
			//var imgUrl= '"'+data.data[i].url + '"';
			html += data.data[i].summary + ' <a href="#" onclick="window.open(\'' + data.data[i].url + '\',\'_blank\',\'location=no\')">read more...</a>\n';
			html += '</article>\n';
		}
		$scope.news = html;
		})


}])


   
.controller('cartCtrl', ['$scope', '$http','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $ionicLoading) {
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	$http({
		method: "GET",
		url: "https://ri-admin.azurewebsites.net/indonesianrugby/photos/list.json"
	}).then(function(data){
		
		$ionicLoading.hide();	
		
		for(var i = 0;i<data.data.data.length;i+=2){
			var html = '<div class="row full">\n';
			html +='<div class="col half">';
			html +='<img class="full" src=' + data.data.data[i] + '></div>\n';
			if(i+1 < data.data.data.length){
				html +='<div class="col half"><img class="full" src=' + data.data.data[i+1] + '></div>\n';
			}
			else {
				html += '<div class="col half"></div>\n';
			}
			html +='</div>\n';
		}
		$scope.photos = html;
		
		
	})
}])
   
.controller('cloudCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	}])
	
.controller('clubsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('fixtureCtrl', ['$scope', '$http', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $ionicLoading) {
$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	$http({
		method: "GET",
		url: "https://ri-admin.azurewebsites.net/indonesianrugby/fixtures/list.json"
	}).then(function(data){
		
		$ionicLoading.hide();	
		
		
		
		var html = '<div>\n';
		
		for(var i = 0;i<data.data.length;i++){
			html += '<a href="#" onclick="window.open(\''+ data.data[i].url+'\',\'_blank\',\'location=no\'"><img class="full" src="' + data.data[i].img + '"></a>\n';
		}
		html += '</div>';
		$scope.fixtures = html;
		
		
	})

}])
 