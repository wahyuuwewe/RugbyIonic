angular.module('app.controllers', ['ngCordova'])
 
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
			//html += '<article>\n';
			html += '<img class="full" src="' + data.data[i].img + '">\n';
			html += '<b>' + data.data[i].title + '</b>\n';
			//var imgUrl= '"'+data.data[i].url + '"';
			html += data.data[i].summary + ' <a href="' + data.data[i].url + '")">read more...</a>\n';
			//html += data.data[i].summary + '<a href="#" onclick="window.open(\'' + data.data[i].url + '\',\'_blank\',\'location=no\')">read more...</a>\n';
			//html += '</article>\n';
		}
		$scope.news = html;
		})


}])


   
.controller('cartCtrl', ['$scope', '$http','$ionicLoading','$cordovaCamera', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
/*
$scope.takePicture = function(){
	var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
		
		$cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
}*/

function ($scope, $http, $ionicLoading , $cordovaCamera) {
	
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
		var html;
		for(var i = 0;i<Object.keys(data.data.data).length;i+=2){
			console.log(Object.keys(data.data.data).length);
			html += '<div class="row">\n';
			html +='<div class="col col-50">';
			html +='<img class="full" src="' + data.data.data[i] + '"></div>\n';
			if(i+1 < Object.keys(data.data.data).length){
				html +='<div class="col col-50"><img class="full" src="' + data.data.data[i+1] + '"></div>\n';
			}
			else {
				html += '<div class="col half"></div>\n';
			}
			html +='</div>\n';
		}
		$scope.photos = html;
		
		
	});
	
	var options = { 
            quality : 50, 
            destinationType : Camera.DestinationType.DATA_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
	
	$scope.takePicture = function(){
		$cordovaCamera.getPicture(options).then(function(imageData) {
			//$state.go('menu.upload');
			//$location.path('/menu.upload');
			//$window.location.href('templates/upload.html');
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
	
	
		
}
/*
	$scope.upload = function(){
		$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
		});
		var foto = document.getElementById("img");
		$http({
			method: "POST",
			url: "https://ri-admin.azurewebsites.net/indonesianrugby/photos/upload.json",
			data: {
				photo : foto.toDataURL("image/png"),
				userId : 'unregistered'
			}
		}).then(function(data){
		
			$ionicLoading.hide();	
		
			if(data.status == "ok"){
				$ionicPopup.alert({
					title: 'Foto Berhasil Diunggah!',
					template: 'anda akan kembali ke halaman sebelumnya'
				});
			}
			$location.path('/cart');
			//$window.location.assign('#/cart');
			//$state.go();
	});	
		
}
	$scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
						
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
				*/
				
				
}])


.controller('uploadCtrl', ['$scope', '$stateParams','$cordovaCamera','$ionicLoading','$window','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$cordovaCamera,$ionicLoading,$window,$http,$ionicPopup) {
var options = { 
            quality : 50, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
		
		var basePhoto;
	
	
		$cordovaCamera.getPicture(options).then(function(imageData) {
			//$state.go('menu.upload');
			//$location.path('/menu.upload');
			//$window.location.href('templates/upload.html');
			var startimg = "data:image/png;base64," + imageData;
            //$scope.imgURI = startimg;
			
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');
			
			var source = new Image();
			source.src = startimg;
			canvas.width = source.width;
			canvas.height = source.height;
			
			context.drawImage(source,0,0);
			basePhoto = source;
			$scope.imgURI = canvas.toDataURL();
			
        }, function(err) {
            // An error occured. Show a message to the user
        });
	
	
		


	$scope.upload = function(){
		$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
		});
		var foto = document.getElementById('canvas');
		var URLfoto = foto.toDataURL("image/png");
		var newUrl = URLfoto.replace(/^data:image\/[a-z]+;base64,/, "");
		$http({
			method: "POST",
			url: "https://ri-admin.azurewebsites.net/indonesianrugby/photos/upload.json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: "userId=unregistered&photo="+newUrl
			/*data: {
				photo : newUrl,
				userId : 'unregistered'
			}*/
		}).then(function(data){
		
			$ionicLoading.hide();	
			var teks;
			for(x in data){
				teks+=x+':'+data[x]+' - ';
			}
			if(data.status == "200"){
				$ionicPopup.alert({
					title: 'Foto Berhasil Diunggah!',
					template: teks
				});
			}
			else{
				$ionicPopup.alert({
					title: 'Foto Gagal Diunggah!',
					template: data + ' - ' + foto.toDataURL("image/png")
				});
			}
			
			$window.history.back();
			//$window.location.assign('#/cart');
			//$state.go();
	});	
		
}

	$scope.frame = function(f){
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.drawImage(basePhoto,0,0);
		var selectedFrame = document.getElementById(f);
		
		ctx.drawImage(selectedFrame,0,0,300,300);
	}

}])

.controller('upload2Ctrl', ['$scope', '$stateParams','$cordovaCamera','$ionicLoading','$window','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$cordovaCamera,$ionicLoading,$window,$http,$ionicPopup) {
var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
		};
		var basePhoto;
                  
   $cordovaCamera.getPicture(options).then(function(imageData) {
			var startimg = "data:image/png;base64," + imageData;
            //$scope.imgURI = startimg;
			
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');
			
			var source = new Image();
			source.src = startimg;
			canvas.width = source.width;
			canvas.height = source.height;
			
			context.drawImage(source,0,0);
			basePhoto = source;
			$scope.imgURI = canvas.toDataURL();
			
        }, function(err) {
            // An error occured. Show a message to the user
        });
                

	$scope.upload = function(){
		$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
		});
		var foto = document.getElementById('canvas');
		$http({
			method: "POST",
			url: "https://ri-admin.azurewebsites.net/indonesianrugby/photos/upload.json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				photo : foto.toDataURL("image/png"),
				userId : 'unregistered'
			}
		}).then(function(data){
		
			$ionicLoading.hide();	
		
			if(data.data.status === "200"){
				$ionicPopup.alert({
					title: 'Foto Berhasil Diunggah!',
					template: 'anda akan kembali ke halaman sebelumnya'
				});
			}else{
				$ionicPopup.alert({
					title: 'Foto Gagal Diunggah!',
					template: data.status +' - '+ data.message
				});
			}
			$window.history.back();
			//$window.location.assign('#/cart');
			//$state.go();
	});	
		
}

	$scope.frame = function(f){
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.drawImage(basePhoto,0,0);
		var selectedFrame = document.getElementById(f);
		
		ctx.drawImage(selectedFrame,0,0,basePhoto.width,basePhoto.height);
	}

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
	
.controller('clubsCtrl', ['$scope', '$http','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
		url: "https://ri-admin.azurewebsites.net/indonesianrugby/clubs/list.json"
	}).then(function(data){
		
		$ionicLoading.hide();	
		
		
		
		var html = '<div>\n';
		var name;
		var loc;
		var contactName;
		var contactValue;
		var img;
		
		for(var i = 0;i<data.data.length;i++){
			nama = data.data[i].name;
			loc = data.data[i].location_training;
			contactName = data.data[i].contacts[0].name;
			contactValue = data.data[i].contacts[0].value;
			img = data.data[i].img;
			html+='<div class="row">';
			
			html+='<div class="col col-25"><img class="full" src="' + img + '"></div>';
			html+='<div class="col col-75">';
			html+='<h1>' + nama + '</h3>';
			html+='Location and training:\n';
			html+=loc+'\n'+'Contact:'+contactValue;
			html+='</div>';
			
			html+='</div>';
			//html += '<a href="#" onclick="window.open(\''+ data.data[i].url+'\',\'_blank\',\'location=no\'"><img class="full" src="' + data.data[i].img + '"></a>\n';
		}
		html += '</div>';
		$scope.clubs = html;
		
		
	})

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
		
		
		
		var html = '';
		
		for(var i = 0;i<data.data.length;i++){
			html += '<a href="'+ data.data[i].url+'"><img class="full" src="' + data.data[i].img + '"></a>\n';
		}
		//html += '</div>';
		$scope.fixtures = html;
		
		
	})

}])
 