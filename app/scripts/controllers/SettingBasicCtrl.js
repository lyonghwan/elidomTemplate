'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.controllers:SettingBasicCtrl
 * @description
 * # Basic Setting Controller
 */
angular.module('ElidomTemplate')
	.controller('SettingBasicCtrl', function($rootScope, $scope, $timeout, ionicMaterialInk, ionicMaterialMotion, AuthService, MenuService, ApiService, API_ENDPOINT, localStorageService) {

		/**
		 * 자동 로그인 설정, 푸쉬 받기 설정 
		 */
		$scope.settings = {
			autosignin : localStorageService.get('autosignin') ? localStorageService.get('autosignin') : false,
			allowPush : localStorageService.get('allow-push') ? localStorageService.get('allow-push') : false
		};

		/**
		 * toggle auto-signin
		 */
		$scope.toggleAutosignin = function() {
			$scope.settings.autosignin = !$scope.settings.autosignin;
			localStorageService.set('autosignin', $scope.settings.autosignin);
		};

		/**
		 * toggle receive-push
		 */
		$scope.toggleReceivePush = function() {
			$scope.settings.allowPush = !$scope.settings.allowPush;
			localStorageService.set('allow-push', $scope.settings.allowPush);
		};

	});