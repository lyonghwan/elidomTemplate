'use strict';

/**
 * @ngdoc function
 * @name core.controllers:SigninCtrl
 * @description Signin
 */
angular.module('Elidom.Core')
    .controller('SigninCtrl', function($rootScope, $scope, $stateParams, $ionicPopup, API_ENDPOINT, MenuService, AuthService, localStorageService) {
        
        /**
         * 사용자 정보 바인딩 모델 
         */
        $scope.user = { userid : '', password : '', autosignin : false };
        /**
         * 메시지 
         */
        $scope.message = ($stateParams && $stateParams.message) ? $stateParams.message : null;

        /**
         * 로그인 처리 
         */
        $scope.login = function() {
            // 1. Design 모드인 경우 ...
            if(API_ENDPOINT.mode == 'LOCAL') {
                if($scope.user.userid && $scope.user.userid !== '') {
                    // local storage에 user_id 저장 
                    if(localStorageService.isSupported) {
                        localStorageService.set('user_id', $scope.user.userid);
                    }

                    MenuService.setSideMenu('main');
                    $rootScope.goHome();

                } else {
                    $ionicPopup.alert({title : '로그인 실패!', template : '사용자 아이디를 입력해주세요.'});
                }         

            // 2. 개발, 테스트, 운영 모드인 경우 
            } else {
                AuthService.signin($scope.user.userid, $scope.user.password, $scope.user.autosignin,
                    function(dataSet) {
                        MenuService.setSideMenu('main');
                        $rootScope.goHome();
                        
                    }, function(dataSet) {
                        $ionicPopup.alert({title : '로그인 실패!', template : dataSet.msg});
                    });
            }
        };
    });