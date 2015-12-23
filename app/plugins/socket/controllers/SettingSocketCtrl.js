'use strict';

/**
 * @ngdoc function
 * @name plugins.printer.controllers:SettingSocketCtrl
 * @description
 * # Socket Controller
 */
angular.module('Elidom.Socket')
	.controller('SettingSocketCtrl', function($rootScope, $scope, $ionicPopup, ionicMaterialInk, ionicMaterialMotion, ApiService, localStorageService) {

		/**
		 * 서버 소켓 포트, 클라이언트 IP, Port
		 */
        $scope.settings = localStorageService.get('setting.socket') ? localStorageService.get('setting.socket') : { serverPort : '', clientIp : '', clientPort : '' };
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
            localStorageService.set('setting.socket', $scope.settings);
            $ionicPopup.alert({ title : '저장되었습니다.' });
            $scope.processing = false;
        };

	});