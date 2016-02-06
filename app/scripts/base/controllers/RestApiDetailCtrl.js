'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:RestApiDetailCtrl
 * @description
 * # Rest API Detail Controller
 */
angular.module('Elidom.Base')
	.controller('RestApiDetailCtrl', function($rootScope, $scope, $state, $stateParams, $ionicPopup, API_ENDPOINT, MenuService, RestApiService) {

		/**
		 * 서비스 상세 
		 */
		$scope.item = null;
		/**
		 * 서비스 상세 조회 URL
		 */
		var serviceUrl = '/rest/rests/api/';
		/**
		 * 실행 중 여부 - For Spinner
		 */
		$scope.processing = false;

		/**
		 * 서비스 찾기 
		 */
		$scope.findServiceApiDetail = function() {
			var params = { api_id : $stateParams.id };
			var url = RestApiService.getContextPathUrl() + serviceUrl + $stateParams.id;
			$scope.processing = true;

			RestApiService.get(url, params,
				function(dataSet) {
					$scope.item = dataSet;
					$scope.item.inputParams = $scope.makeInputParams($scope.item.inputTypeList);
				});
		};

		/**
		 * JSON형태의 Input Parameter 문자열을 만든다.
		 */
		$scope.makeInputParams = function(inputList) {
			if(!inputList || inputList.length == 0) {
				return "{\n}";
			} else {
				var inputParams = {};
				for(var i = 0 ; i < inputList.length ; i++) {
					var input = inputList[i];
					var name = input.name;
					var type = input.type;

					if($scope.isBoolType(type)) {
						inputParams[name] = false;
					} else if($scope.isNumberType(type)) {
						inputParams[name] = 0;
					} else if($scope.isPrimitiveType(type)) {
						inputParams[name] = '';
					} else if($scope.isArrayType(type)) {
						inputParams[name] = [];
					} else {
						inputParams[name] = {};
					}
				}

				return JSON.stringify(inputParams, null, "\t");
			}
		};

		/**
		 * Boolean type 인지 체크 
		 */
		$scope.isBoolType = function(type) {
			if(type == 'java.lang.Boolean' || type == 'boolean') {
				return true;
			} else {
				return false;
			}
		};

		/**
		 * Number type 인지 체크 
		 */
		$scope.isNumberType = function(type) {
			if(type == 'java.lang.Integer' || type == 'java.lang.Long' || type == 'java.lang.Double' || type == 'java.lang.Short') {
				return true;
			} else if(type == 'int' || type == 'long' || type == 'short' || type == 'double') {
				return true;
			} else {
				return false;
			}
		};

		/**
		 * Primitive type 인지 체크 
		 */
		$scope.isPrimitiveType = function(type) {
			if(type.indexOf('.') < 0) {
				return true;
			} else if(type == 'java.lang.String' || type == 'java.lang.Integer' || type == 'java.lang.Long' || type == 'java.lang.Double' || type == 'java.lang.Short' || type == 'java.lang.Boolean' || type == 'java.util.Date') {
				return true;
			} else {
				return false;
			}
		};

		/**
		 * Array type 인지 체크 
		 */
		$scope.isArrayType = function(type) {
			if(type == 'java.util.List' || type == 'java.util.ArrayList' || type == 'java.util.Collection') {
				return true;
			} else {
				return false;
			}
		};

		/**
		 * API Invoke (Http)
		 */
		$scope.invokeHttp = function() {
			var item = $scope.item;
			var params = $scope.isValid(item.inputParams);

			if(false !== params) {
				$scope.item.outputParams = '';
				var method = item.httpMethod;
				var url = RestApiService.makeFullUrl(RestApiService.getContextPathUrl(), item.url);
				
				if(method == 'POST') {
					RestApiService.post(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				} else if(method == 'PUT' || method == 'PATCH') {
					RestApiService.put(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				} else if(method == 'DELETE') {
					RestApiService.delete(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				} else {
					RestApiService.get(url, params, $scope.invokeSuccess, $scope.invokeFailure);
				}
			}
		};

		/**
		 * invoke success
		 */
		$scope.invokeSuccess = function(dataSet) {
			//$ionicPopup.alert({ title : 'Success', template : '리턴값을 확인하세요' });
			$scope.item.outputParams = JSON.stringify(dataSet, null, "\t");
		},

		/**
		 * invoke failed
		 */
		$scope.invokeFailure = function(dataSet) {
			//$ionicPopup.alert({ title : 'Failure', template : '리턴값을 확인하세요' });
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
			if($stateParams.id) {
				$scope.findServiceApiDetail();
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