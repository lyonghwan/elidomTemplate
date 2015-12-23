'use strict';

/**
 * @ngdoc function
 * @name plugins.printer.controllers:SettingPrinterCtrl
 * @description
 * # Printer Controller
 */
angular.module('Elidom.Printer')
	.controller('SettingPrinterCtrl', function($rootScope, $scope, $ionicPopup, ionicMaterialInk, ionicMaterialMotion, ApiService, localStorageService) {

		/**
		 * 프린터 명, 프린트 서비스 URL
		 */
		$scope.settings = localStorageService.get('setting.printer') ? localStorageService.get('setting.printer') : { printerName : '', printUrl : '' };
		/**
		 * 저장 중 여부 - For Spinner show / hide
		 */
		$scope.processing = false;
		/**
		 * Activate ink for controller
		 */
		ionicMaterialInk.displayEffect();
		/**
		 * Material Motion
		 */
		ionicMaterialMotion.pushDown({
		    selector: '.push-down'
		});
		/**
		 * Material Motion
		 */
		ionicMaterialMotion.fadeSlideInRight({
		    selector: '.animate-fade-slide-in .item'
		});

		/**
		* 검색 종료 이벤트를 받아서 스피너 중단.
		* 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
		*/
		$scope.$on('search.complete', function(event) {
			$scope.processing = false;
		});

		/**
		 * 설정 저장 - TODO 서버 서비스 호출
		 */
		$scope.saveSettings = function() {
			$scope.processing = true;
			localStorageService.set('setting.printer', $scope.settings);
			$ionicPopup.alert({ title : '저장되었습니다.' });
			$scope.processing = false;
		};

	});