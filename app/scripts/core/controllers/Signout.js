'use strict';

/**
 * @ngdoc function
 * @name core.controller:SignoutCtrl
 * @description Signout
 */
angular.module('Elidom.Core')
    .controller('SignoutCtrl', function($rootScope, $scope, $ionicPopup, MenuService, AuthService, API_ENDPOINT, localStorageService) {

        /**
         * 1. 로컬 모드일 경우 
         */
        if('LOCAL' == API_ENDPOINT.mode) {
            if(localStorageService.isSupported) {
                localStorageService.remove('user_id');
            }
            
            MenuService.setSideMenu('main');
            $rootScope.goHome();

        /**
         * 2. 개발, 테스트, 운영 모드일 경우 
         */
        } else {
            AuthService.signout(
                function(dataSet) {
                    MenuService.setSideMenu('main');
                    $rootScope.goHome();

                }, function(dataSet) {
                    $ionicPopup.alert({title : '로그아웃 실패!', template : dataSet.msg});
                });
        }
    });