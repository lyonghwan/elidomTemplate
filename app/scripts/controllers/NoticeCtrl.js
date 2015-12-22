'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.controllers:NoticeCtrl
 * @description 공지사항
 */
angular.module('ElidomTemplate')
    .controller('NoticeCtrl', function($scope, $http, $ionicPopup, API_ENDPOINT, MenuService, ApiService) {

        /**
         * 메뉴 리스트
         */
        MenuService.setSideMenu('main');
        /**
         * 공지사항 리스트
         */
        $scope.items = [];
        /**
         * 공지사항 상세
         */
        $scope.itemDetail = null;
        /**
         * 검색 진행 중 여부 - For Spinner show / hide
         */
        $scope.searching = false;
        /**
         * 현재 페이지
         */
        $scope.currentPage = 1;
        /**
         * 페이지 당 레코드 수
         */
        $scope.pageDataCnt = API_ENDPOINT.pageLimit + API_ENDPOINT.pageLimit;
        /**
         * 총 검색 카운트 
         */
        $scope.totalCount = 0;
        /**
         * For Infinite scroll
         */
        $scope.hasMoreItems = false;
        /**
         * service url
         */
        $scope.serviceUrl = '/data/default/noticeList.json';

        /**
         * [toggleItem Acordian 구현]
         * @param  Object item [클릭 한 Item]
         */
        $scope.toggleItem = function(item) {
            var oriActive = item.active;
            $scope.disableAll();
            item.active = !oriActive;

            if (item.active) {
                $scope.showItemData(item);
            }
        };

        /**
         * Complete Search 구현
         * @param  Object item [클릭 한 Item]
         */
        $scope.$watch('search.key', function() {
           if($scope.search.key !== undefined) {
                $scope.search();
           }

           if($scope.search.key === '') {
                $scope.searchMore();
           }
        });

        /**
         * 검색
         */
        $scope.search = function() {
            $scope.searching = true;
            $scope.currentPage = 1;
            var params = { limit : $scope.pageDataCnt, searchKey : $scope.search.key };

            ApiService.search($scope.serviceUrl, params, function(dataSet) {
                $scope.totalCount = dataSet.total;
                $scope.hasMoreItems = ($scope.currentPage < dataSet.totalPage);
                angular.forEach(dataSet.items, function(item) {
                    item.active = false;
                    // 공지사항 상세 조회 진행 중 여부 - For Spinner show / hide
                    item.searching = false;
                });
                $scope.items = dataSet.list;
            });
        };

        /**
         * 다음 페이지 검색 - infinite scroll
         */
        $scope.searchMore = function() {
            $scope.currentPage = $scope.currentPage + 1;
            var skip = ($scope.currentPage - 1) * $scope.pageDataCnt;
            var params = {
                page : $scope.currentPage,
                start : skip,
                limit : $scope.pageDataCnt,
                searchKey : $scope.search.key
            };

            ApiService.search($scope.serviceUrl, params, function(dataSet) {
                $scope.hasMoreItems = ($scope.currentPage < dataSet.totalPage);
                angular.forEach(dataSet.list, function(item) {
                    item.active = false;
                    // 공지사항 상세 조회 진행 중 여부 - For Spinner show / hide
                    item.searching = false;
                    $scope.items.push(item);
                });

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        /**
         * 다음 페이지 검색
         */
        $scope.loadMore = function() {
            if ($scope.hasMoreItems) {
                $scope.searchMore();
            }
        };        

        /**
         * [showItemData  Call Serve Get API]
         * @param  Object params [검색 조건]
         */
        $scope.showItemData = function(item) {
            var url = "/data/default/notice.json";
            var params = { s_no : item.s_no };
            item.searching = true;
            $scope.itemDetail = "";
            
            ApiService.get(url, params, 
                function(dataSet) {
                    item.active = true;
                    // 공지사항 상세 조회 진행 중 여부 - For Spinner show / hide
                    item.searching = false;
                    $scope.itemDetail = dataSet.item.content;
                },
                function(dataSet) {
                    $scope.itemDetail = "내용이 없거나 잘못된 문서입니다.";
                });
        };

        /**
         * 모든 항목을 false로 변경  
         */
        $scope.disableAll = function() {
            for (var i = 0; i < $scope.items.length; i++) {
                if($scope.items[i].active) {
                    $scope.items[i].active = false;
                }
            }
        };

        /**
         * 검색 종료 이벤트를 받아서 스피너 중단.
         * 검색 종료 이벤트는 APIService에서 검색 완료/실패/에러시 모두 notify
         */
        $scope.$on('search.complete', function(event) {
            $scope.searching = false;
        });

        /**
         * Initializer
         */
        $scope.init = function() {
            $scope.search();
        };

    });