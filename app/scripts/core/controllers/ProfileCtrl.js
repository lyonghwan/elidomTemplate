'use strict';

/**
 * @ngdoc function
 * @name core.controllers:ProfileCtrl
 * @description
 * # Profile Controller
 */
angular.module('Elidom.Core')
	.controller('ProfileCtrl', function($rootScope, $scope, $timeout, ionicMaterialInk, ionicMaterialMotion, AuthService, MenuService, RestApiService, API_ENDPOINT, localStorageService, StompWebSocketService) {

	    /**
	     * 사이드 메뉴 구성 
	     */
	    MenuService.setSideMenu('main');
	    /**
	     * 변수 데이터 모델
	     */
	    $scope.item = {};
	    /**
	     * Searching 변수
	     */
	    $scope.searching = false;
	    /**
	     * 자동 로그인 설정 
	     */
	    $scope.autosignin = localStorageService.get('autosignin') ? localStorageService.get('autosignin') : false;

		// Set Motion
		$timeout(function() {
			ionicMaterialMotion.slideUp({
				selector: '.slide-up'
			});
		}, 300);

		$timeout(function() {
			ionicMaterialMotion.fadeSlideInRight({
				startVelocity: 3000
			});
		}, 700);

		// Set Ink
		ionicMaterialInk.displayEffect();

	    /**
	     * 내 정보 가져오기
	     */
	    $scope.getMyInfo = function() {
	        $scope.searching = true;
	        var contextUrl = RestApiService.getContextPathUrl();
	        var url = RestApiService.makeFullUrl(contextUrl, '/my/myInfo.json');
	        
	        RestApiService.get(url, null, function(dataSet) {
	            $scope.item = dataSet;
	        });
	    };

	    /**
	     * toggle auto-signin
	     */
	    $scope.toggleAutosignin = function() {
	        $scope.autosignin = !$scope.autosignin;
	        localStorageService.set('autosignin', $scope.autosignin);
	    };

	    /**
	     * 조회 종료 이벤트를 받아서 스피너 중단.
	     * 조회 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
	     */
	    $scope.$on('search.complete', function(event) {
	        $scope.searching = false;
	    });

	    /**
	     * Initializer
	     */
	    $scope.init = function() {
	        //$scope.getMyInfo();
	    };

	});