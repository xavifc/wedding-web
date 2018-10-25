(function() {
	"use strict";

	var controller = angular.module('wedding').controller('MainController', MainController);

	function MainController($scope, $timeout, $translate, $window) {
		$scope.loaded = false;
		$scope.showKiss = true;
		$scope.confirmation = {
				who: '',
				with: '',
				why: ''
		};
		$scope.sended = {
				ok: false,
				ko: false,
				loading: false
		};
		
		$scope.kiss = function() {
			var backImg = 'img/IMG_20161023_180152.jpg';
			var backImgKiss = 'img/IMG_20161023_180228.jpg';
			if ($window.innerWidth < 600) {
				backImg = 'img/IMG_20161023_180152_xs.jpg';
				backImgKiss = 'img/IMG_20161023_180228_xs.jpg';
			}
			if ($scope.showKiss) {
				$scope.changeBackImage(backImg);
			} else {
				$scope.changeBackImage(backImgKiss);
			}
			$scope.showKiss = !$scope.showKiss;
		};
		$scope.changeBackImage = function(newBackImg) {
			var image = new Image();
			image.onload = function () {
				document.getElementById('background').style.backgroundImage = 'url("' + newBackImg + '")';
				if (!$scope.loaded) {
					$scope.loaded = true;
					$scope.$apply();
				}
				$timeout(function() {
					$scope.kiss();
				}, 3000);
			};
			image.src = newBackImg;
		};
		$scope.kiss();

		$scope.changeLanguage = function(lang) {
			$translate.use(lang);
		};
		
		$scope.sendConfirmation = function() {
			if ($scope.confirmForm.$valid) {
				$scope.sended.ok = false;
				$scope.sended.ko = false;
				$scope.sended.loading = true;
				$scope.confirmation.date = firebase.database.ServerValue.TIMESTAMP;
				firebase.database().ref('/confirmations').push($scope.confirmation).then(function() {
					$scope.sended.loading = false;
					$scope.sended.ok = true;
				}, function errorCallback(response) {
					$scope.sended.loading = false;
					$scope.sended.ko = true;
				});
			}
		};
	}
})();