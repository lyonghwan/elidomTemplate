'use strict';

// 1. Core Module
angular.module('Elidom.Core', ['ionic', 'ngCordova', 'ngResource', 'oc.lazyLoad', 'LocalStorageModule', 'ionic-datepicker', 'ionic-material', 'ionMdInput', 'chart.js'])

// 2. Base Module
angular.module('Elidom.Base', ['Elidom.Core']);

/**
 * @ngdoc overview
 * @name ElidomTemplate
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */
angular.module('ElidomTemplate', ['Elidom.Core', 'Elidom.Base'])

    .run(function($ionicPlatform, $rootScope, $location, $ionicHistory, $state, $ionicPopup, SettingService, localStorageService, DynamicLoadService, API_ENDPOINT, StompWebSocketService) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                API_ENDPOINT.isApp = true;
                API_ENDPOINT.mode = 'PRODUCTION';                
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            var platform = ionic.Platform.platform();
            if(platform == "android" || platform == "ios") {
                $rootScope.isDivicePlatform = true;
            }

            /**
             * Stomp Initialize
             */
            StompWebSocketService.initialize();

        });

        /**
         * 설정 메뉴에 표시될 항목들 최초 로딩
         */
        SettingService.loadDefaultSettings();

        /**
         * hardware backbutton bnding
         */
        $ionicPlatform.registerBackButtonAction(function() {
            if ($state.current.name == "app.signin" || $state.current.name == "app.home") {
                var confirmPopup = $ionicPopup.confirm({
                    title: '앱 종료 안내',
                    template: '앱을 종료하시겠습니까?'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        if (navigator.app) {
                            navigator.app.exitApp();
                        } else if (navigator.device) {
                            navigator.device.exitApp();
                        }
                    } else {
                        event.preventDefault();
                    }
                });
            } else {
                $rootScope.goBack();
            }
        }, 100);

        /**
         * 이전 화면으로 이동
         */
        $rootScope.goBack = function() {
            var backView = $ionicHistory.backView();
            if ($state.current.name != "app.signin" && $state.current.name != "app.home") {
                if (backView) {
                    $ionicHistory.goBack();
                } else {
                    $rootScope.goHome();
                }
            }
        };

        /**
         * 홈 화면으로 이동
         */
        $rootScope.goHome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });

            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('app.home', {}, { reload: true });
        };

        /**
         * 로그인 화면으로 이동
         */
        $rootScope.goSignin = function(message) {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });

            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('app.signin', { message : message }, { reload : true });
        };

        /**
         * 필요한 화면으로 이동
         */
        $rootScope.goMenu = function(menuState, params) {
            $state.go(menuState, { params: params }, { reload: true }, { notify: true });
        };

        // Server URL
        $rootScope.serverUrl = 'http://' + $location.host() + ':' + $location.$$port;
        // API END_POINT 정보
        API_ENDPOINT.isApp = false;
        API_ENDPOINT.needsAuth = false;
        API_ENDPOINT.mode = 'DEV';
        API_ENDPOINT.path = '';
        API_ENDPOINT.pageLimit = 10;
        API_ENDPOINT.protocol = localStorageService.get('server-protocol') ? localStorageService.get('server-protocol') : 'http';
        API_ENDPOINT.host = localStorageService.get('server-host') ? localStorageService.get('server-host') : $location.host();
        API_ENDPOINT.port = localStorageService.get('server-port') ? localStorageService.get('server-port') : $location.$$port;

        /**
         * 플러그 인 모듈을 동적 로딩한다.
         */
        DynamicLoadService.loadPluginModules();

        /**
         * 공지 사항 Subscribe
         */
        $rootScope.$on('/elidom/stomp/topic/notice', function(event, data) {
            $ionicPopup.alert({ title : '공지사항', template : data });
        });
    });