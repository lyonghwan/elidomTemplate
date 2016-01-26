'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:RestDetailCtrl
 * @description
 * # Rest Detail Controller
 */
angular.module('Elidom.Base')
	.controller('RestDetailCtrl', function($rootScope, $scope, $state, $stateParams, API_ENDPOINT, MenuService, RestApiService) {

		/**
		 * 서비스 상세 
		 */
		$scope.item = null;
		/**
		 * 서비스 상세 조회 URL
		 */
		var serviceUrl = '/rest/findService.json';
		/**
		 * 실행 중 여부 - For Spinner
		 */
		$scope.processing = false;

		/**
		 * 서비스 찾기 
		 */
		$scope.findServiceDetail = function() {
			var params = {id : $stateParams.id };
			$scope.processing = true;

			RestApiService.get(serviceUrl, params,
				function(dataSet) {
					$scope.item = dataSet.item;
				});
		};

		/**
		 * API 상세로 이동 
		 */
		$scope.goApiDetail = function(item) {
			$state.go('app.rest-api-detail', { id : item.id });
		};

		/**
		 * 초기화 
		 */
		$scope.init = function() {
			if($stateParams.id) {
				$scope.findServiceDetail();
			}
		};

        /**
         * 검색 종료 이벤트를 받아서 스피너 중단.
         * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
         */
        $scope.$on('search.complete', function(event) {
            $scope.processing = false;
        });

	});