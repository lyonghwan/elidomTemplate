'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:ChannelCtrl
 * @description
 * # Channel Controller
 */
angular.module('Elidom.Base')
    .controller('ChannelCtrl', function($scope, $state, MenuService, RestApiService) {

        /**
         * 메뉴 
         */
        MenuService.setSideMenu('main');
        /**
         * 서비스 리스트
         */
        $scope.items = [];
        /**
         * 검색 조건
         */
        $scope.searchData = {
            queryList : [{
                name : 'name',
                type : 'string',
                operator : 'like',
                value : ''
            }]
        };
        /**
         * 검색 진행 중 여부 - For Spinner show / hide
         */
        $scope.searching = false;
        /**
         * For Infinite scroll
         */
        $scope.hasMoreItems = false;
        /**
         * service url
         */
        $scope.serviceUrl = '/core/service/channel/search.json';
        /**
         * 검색
         */
        $scope.search = function() {
            $scope.searching = true;
            RestApiService.searchBypost($scope.serviceUrl, $scope.searchData, function(dataSet) {
                $scope.items = dataSet.items;
            });
        };

        /**
         * 서비스 디테일로 이동 
         */
        $scope.goDetail = function(item) {
            if(item) {
                $state.go('app.channel-detail', { id : item.id });
            } else {
                $state.go('app.channel-detail', { id : '' });
            }
        };

        /**
         * 검색 종료 이벤트를 받아서 스피너 중단.
         * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
         */
        $scope.$on('search.complete', function(event) {
            $scope.searching = false;
        });

    });