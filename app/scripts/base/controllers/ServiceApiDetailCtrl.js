'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:ServiceApiDetailCtrl
 * @description
 * # Service API Detail Controller
 */
angular.module('Elidom.Base')
	.controller('ServiceApiDetailCtrl', function($rootScope, $scope, $state, $stateParams, $ionicPopup, API_ENDPOINT, MenuService, ApiService, RestApiService) {

		/**
		 * 서비스 상세 
		 */
		$scope.item = null;
		/**
		 * 서비스 상세 조회 URL
		 */
		var serviceUrl = '/core/service/api/findApi.json';
		/**
		 * 실행 중 여부 - For Spinner
		 */
		var processing = false;

		/**
		 * 서비스 찾기 
		 */
		$scope.findServiceApiDetail = function() {
			var params = {id : $stateParams.id };
			this.processing = true;

			RestApiService.get(serviceUrl, params,
				function(dataSet) {
					$scope.item = dataSet.item;
					$scope.item.inputParams = "{\n}";
				});
		};

		/**
		 * API 상세로 이동 
		 */
		$scope.invoke = function() {
			var item = $scope.item;
			var params = $scope.isValid(item.inputParams);

			if(false !== params) {
				var method = item.method;
				var url = '/' + item.url;
				
				if(method == 'POST') {
					RestApiService.post(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				} else if(method == 'PUT' || method == 'PATCH') {
					RestApiService.post(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				} else if(method == 'DELETE') {
					RestApiService.post(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				} else {
					RestApiService.get(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				}
			}
		};

		/**
		 * invoke success
		 */
		$scope.invokeSuccess = function(dataSet) {
			// $ionicPopup.alert({ title : 'Success to Invoke' });
			$scope.item.outputParams = JSON.stringify(dataSet);
		},

		/**
		 * invoke failed
		 */
		$scope.invokeFailure = function(dataSet) {
			$scope.item.outputParams = JSON.stringify(dataSet);
		},		

		/**
		 * check validation input parameter
		 */
		$scope.isValid = function(inputParams) {
			if(inputParams == '') {
				$ionicPopup.alert( { title : '입력값이 비었습니다.' });
				return false;
			}

			try {
				return JSON.parse(inputParams);
			} catch(e) {
				$ionicPopup.alert( { title : '입력값이 유효하지 않습니다.', message : '파싱 에러' });
				return false;
			}

			return false;
		};

		/**
		 * 초기화 
		 */
		$scope.init = function() {
			$scope.findServiceApiDetail();
		};

        /**
         * 검색 종료 이벤트를 받아서 스피너 중단.
         * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
         */
        $scope.$on('search.complete', function(event) {
            $scope.processing = false;
        });

	});