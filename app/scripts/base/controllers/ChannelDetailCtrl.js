'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:ChannelDetailCtrl
 * @description
 * # Channel Detail Controller
 */
angular.module('Elidom.Base')
	.controller('ChannelDetailCtrl', function($rootScope, $scope, $state, $stateParams, $ionicPopup, API_ENDPOINT, MenuService, RestApiService) {

		/**
		 * 채널 상세 
		 */
		$scope.item = { domainId : 1, topicType : 'ChannelTopic' };
		/**
		 * 뷰 타이틀 
		 */
		$scope.viewTitle = "채널 상세";
		/**
		 * 채널 조회 URL
		 */
		var findUrl = '/channel/find.json';
		/**
		 * 채널 생성 URL
		 */
		var createUrl = '/channel/create.json';
		/**
		 * 채널 업데이트 URL
		 */
		var updateUrl = '/channel/update.json';
		/**
		 * 채널 삭제 URL
		 */
		var deleteUrl = '/channel/delete.json';
		/**
		 * 채널 삭제 URL
		 */
		var applyUrl = '/channel/applyListener.json';
		/**
		 * 실행 중 여부 - For Spinner
		 */
		$scope.processing = false;

		/**
		 * 서비스 찾기 
		 */
		$scope.findChannelDetail = function() {
			var params = {id : $stateParams.id };
			$scope.processing = true;

			RestApiService.get(findUrl, params,
				function(dataSet) {
					$scope.item = dataSet.item;
				});
		};

		/**
		 * 채널 생성 
		 */
		$scope.createChannel = function() {
			$scope.processing = true;
			RestApiService.post(createUrl, $scope.item,
				function(dataSet) {
					$scope.item = dataSet.item;
				});
		};

		/**
		 * 채널 업데이트 
		 */
		$scope.updateChannel = function() {
			$scope.processing = true;
			RestApiService.put(updateUrl, $scope.item,
				function(dataSet) {
					$scope.item = dataSet.item;
				});
		};

		/**
		 * 채널 삭제  
		 */
		$scope.deleteChannel = function() {
			$scope.processing = true;
			RestApiService.delete(deleteUrl + '?id=' + $scope.item.id, null,
				function(dataSet) {
					$state.go('app.channel');
				});
		};

		/**
		 * 채널 적용  
		 */
		$scope.applyChannel = function() {
			$scope.processing = true;
			RestApiService.post(applyUrl, $scope.item,
				function(dataSet) {
					$ionicPopup.alert({ title : 'Success', template : 'Succeeded to binding Listener and Topic' });
				});
		};

		/**
		 * 채널 적용  
		 */
		$scope.save = function() {
			if($scope.item && $scope.item.id) {
				$scope.updateChannel();
			} else {
				$scope.createChannel();
			}
		};		

		/**
		 * 초기화 
		 */
		$scope.init = function() {
			if($stateParams && $stateParams.id) {
				$scope.findChannelDetail();
			} else {
				$scope.viewTitle = "채널 생성";
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