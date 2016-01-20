'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:ServiceApiDetailCtrl
 * @description
 * # Service API Detail Controller
 */
angular.module('Elidom.Base')
	.controller('ServiceApiDetailCtrl', function($rootScope, $scope, $state, $stateParams, $ionicPopup, API_ENDPOINT, MenuService, RestApiService, WebSocketService, StompWebSocketService) {

		/**
		 * 서비스 상세 
		 */
		$scope.item = null;
		/**
		 * 서비스 상세 조회 URL
		 */
		var serviceUrl = '/api/findApi.json';
		/**
		 * 실행 중 여부 - For Spinner
		 */
		$scope.processing = false;

		/**
		 * 서비스 찾기 
		 */
		$scope.findServiceApiDetail = function() {
			var params = {id : $stateParams.id };
			$scope.processing = true;

			RestApiService.get(serviceUrl, params,
				function(dataSet) {
					$scope.item = dataSet.item;
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
		 * Replace Invoke URL 
		 */
		$scope.makeInvokeUrl = function(url) {
			if(url[0] == '/') {
				return RestApiService.getContextPathUrl() + url + '.json';
			} else {
				return RestApiService.getContextPathUrl() + '/' + url + '.json';
			}
		};

		/**
		 * API Invoke (Stomp)
		 */
		$scope.invokeStomp = function() {
			var params = $scope.isValid($scope.item.inputParams);
			if(params !== false) {
				$scope.item.outputParams = '';
				StompWebSocketService.send($scope.item.wsUrl, $scope.item.inputParams);
			}			
		};

		/**
		 * API Invoke (Web Socket)
		 */
		$scope.invokeWebSocket = function() {
			var params = $scope.isValid($scope.item.inputParams);
			if(params !== false) {
				$scope.item.outputParams = '';
				WebSocketService.connect($scope.item.wsUrl);
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
				var method = item.method;
				var url = $scope.makeInvokeUrl(item.url);
				
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
		 * Web Socket Connected Listener
		 */
		var wsOpenListener = $rootScope.$on('websocket.opened', function(event, data) {
			//$ionicPopup.alert({ title : 'WebSocket connection connected.' });
			if($scope.item && $scope.item.wsUrl == data) {
				WebSocketService.send($scope.item.inputParams);
			}
		});

		/**
		 * Web Socket OnMessage Listener
		 */
		var wsOnmessageListener = $rootScope.$on('websocket.onmessage', function(event, data) {
			if($scope.item && $scope.item.wsUrl == data.wsUrl) {
				$ionicPopup.alert({ title : 'Received Response', template : '리턴값을 확인하세요' });
				WebSocketService.disconnect();
				$scope.item.outputParams = data.data;
			}
		});

		/**
		 * Stomp OnMessage Listener
		 */
		/*var stompOnmessageListener = $rootScope.$on('/elidom/stomp/topic/service', function(event, data) {
			if($scope.item) {
				$ionicPopup.alert({ title : 'Received Response', template : '리턴값을 확인하세요' });
				$scope.item.outputParams = data;
			}
		});*/

		/**
		 * Scope destroy시 timeout 제거
		 */
		$scope.$on('$destroy', function(event) {
			wsOpenListener();
			wsOnmessageListener();
			//stompOnmessageListener();
		});

        /**
         * 검색 종료 이벤트를 받아서 스피너 중단.
         * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
         */
        $scope.$on('search.complete', function(event) {
            $scope.processing = false;
        });

	});