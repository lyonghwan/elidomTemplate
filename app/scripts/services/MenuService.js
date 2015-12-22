'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.services:MenuService
 * @description 
 *  # 메뉴 서비스
 */
angular.module('ElidomTemplate')
  .factory('MenuService', function($rootScope, $resource, $timeout, $ionicPopup, AuthService) {

    /**
     * Side Menu 모두 제거
     */
    var clearSideMenu = function() {
        $rootScope.menus = [];
    };

    /**
     * Side Menu 갱신 
     */
    var setSideMenu = function(parentMenu) {
        if($rootScope.serverUrl && $rootScope.serverUrl !== '') {
            var url = $rootScope.serverUrl + '/data/menu/' + parentMenu + '.json';
            this.getMenus(url);
        } else {
            this.tryAgain(parentMenu);
        }
    };

    /**
     * 아직 serverUrl이 완성되지 않았다면 재시도 
     */
    var tryAgain = function(parentMenu) {
        var me = this;
        $timeout(function() {
            if($rootScope.serverUrl && $rootScope.serverUrl !== '') {
                var url = $rootScope.serverUrl + '/data/menu/' + parentMenu + '.json';
                me.getMenus(url);
            } else {
                me.tryAgain(parentMenu);
            }
        }, 2000);
    };

    /**
     * 서버로 메뉴 정보를 호출
     */
    var getMenus = function(url) {
        var menuRsc = $resource(url, null, {
            'get': {
                method: 'GET',
                isArray: true
            }
        });

        menuRsc.get(
            // good
            function(dataSet, response) {
                $rootScope.menus = dataSet;

                if(AuthService.isSigned()) {
                  $rootScope.menus.push({
                    "name" : "로그아웃",
                    "state" : "app.signout",
                    "icon" : "ion-log-out"
                  });
                
                } else {
                  // 로그인 메뉴 추가 
                  $rootScope.menus.push({
                    "name" : "로그인",
                    "state" : "app.signin",
                    "icon" : "ion-log-in"
                  });
                }

            // bad
            }, function(response) {
                $ionicPopup.alert({
                    title: '요청하신 메뉴가 없습니다.'
                });
            });
    };

    // public api
    return {
        clearSideMenu : clearSideMenu,
        setSideMenu: setSideMenu,
        tryAgain: tryAgain,
        getMenus: getMenus
    };
});