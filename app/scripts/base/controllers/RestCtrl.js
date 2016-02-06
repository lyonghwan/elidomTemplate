'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:RestCtrl
 * @description
 * # Rest Service Descriptor Controller
 */
angular.module('Elidom.Base')
    .controller('RestCtrl', function($scope, $state, MenuService, RestApiService) {

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
        $scope.searchData = 'core';        
        /**
         * 검색 진행 중 여부 - For Spinner show / hide
         */
        $scope.searching = false;
        /**
         * For Infinite scroll
         */
        $scope.hasMoreItems = false;
        /**
         * get module list url
         */
        var moduleListUrl = '/rest/modules';        
        /**
         * service url
         */
        var serviceUrl = '/rest/rests';
        /**
         * Module List
         */
        $scope.modules = null;

        /**
         * Module List 조회 
         */
        $scope.getModuleList = function() {
            var url = RestApiService.getContextPathUrl() + moduleListUrl;

            RestApiService.get(url, null, function(items) {
                if(items) {
                    $scope.modules = [];
                    for(var i = 0 ; i < items.length ; i++) {
                        $scope.modules.push({
                            text : items[i],
                            checked : false
                        });
                    }
                }
            });
        };

        /**
         * 검색
         */
        $scope.search = function() {
            $scope.searching = true;
            var url = RestApiService.getContextPathUrl() + serviceUrl;

            RestApiService.get(url, { module : $scope.searchData }, function(dataSet) {
                $scope.items = dataSet;
            });
        };

        /**
         * 서비스 디테일로 이동 
         */
        $scope.goDetail = function(item) {
            $state.go('app.rest-detail', { id : item.id });
        };

        /**
         * 선택한 모듈만 검색 
         */
        $scope.searchByModule = function(item) {
            var value = '';

            if(item.checked) {
                angular.forEach($scope.modules, function(module) {
                    if(module.text != item.text) {
                        module.checked = false;
                    }
                });

                value = item.text;
            } else {
                value = '';
            }

            $scope.searchData = item.text;
            $scope.search();
        };

        /**
         * 검색 종료 이벤트를 받아서 스피너 중단.
         * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
         */
        $scope.$on('search.complete', function(event) {
            $scope.searching = false;
        });

        /**
         * Initialize
         */
        $scope.init = function() {
            $scope.getModuleList();
            $scope.search();
        };

    });