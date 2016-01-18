'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:SettingBasicCtrl
 * @description
 * # Basic Setting Controller
 */
angular.module('Elidom.Base')
	.controller('SettingBasicCtrl', function($scope, $ionicPopup, API_ENDPOINT, localStorageService) {

		/**
		 * 자동 로그인 설정, 푸쉬 받기 설정 
		 */
		$scope.settings = {
			serverProtocol : API_ENDPOINT.protocol,
			serverHost : API_ENDPOINT.host,
			serverPort : API_ENDPOINT.port,
			contextPath : API_ENDPOINT.path,
			urlPrefix : API_ENDPOINT.urlPrefix,
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

		/**
		 * Protocol 설정 정보 Validation
		 */
		$scope.checkProtocol = function() {
			return ($scope.settings.serverProtocol == 'http' || $scope.settings.serverProtocol == 'https');
		};

		/**
		 * Host 설정 정보 Validation 
		 */
		$scope.checkHost = function() {
			if($scope.settings.serverHost == 'localhost') {
				return true;
			} else {
				var patt = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
				return patt.test($scope.settings.serverHost);
			}
		};

		/**
		 * Port 설정 정보 Validation 
		 */
		$scope.checkPort = function() {
			return $scope.settings.serverPort > 1 && $scope.settings.serverPort < 20000;
		};

		/**
		 * 설정 정보 저장 
		 */
		$scope.save = function() {
			if($scope.checkProtocol() && $scope.checkHost() && $scope.checkPort()) {
				API_ENDPOINT.protocol = $scope.settings.serverProtocol;
				API_ENDPOINT.host = $scope.settings.serverHost;
				API_ENDPOINT.port = $scope.settings.serverPort;
				API_ENDPOINT.path = $scope.settings.contextPath;
				API_ENDPOINT.urlPrefix = $scope.settings.urlPrefix;
				
				localStorageService.set('server-protocol', API_ENDPOINT.protocol);
				localStorageService.set('server-host', API_ENDPOINT.host);
				localStorageService.set('server-port', API_ENDPOINT.port);
				localStorageService.set('context-path', API_ENDPOINT.path);
				localStorageService.set('url-prefix', API_ENDPOINT.urlPrefix);
				$ionicPopup.alert({ title : '저장되었습니다.' });
			} else {
				$ionicPopup.alert({ title : '설정값이 유효하지 않습니다.' });
			}
		}

	});