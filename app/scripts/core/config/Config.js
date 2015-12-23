'use strict';

/**
 * @ngdoc constant
 * @name core.Core.config
 * @description
 *  모든 화면 라우터와 서버연결 정보를 이 파일에서 정의한다.
 */
angular.module('Elidom.Core')

  // 서버 URL설정 : 기본으로 로컬환경으로 설정 
  .constant('API_ENDPOINT', {
    isApp: false,
    mode: 'DEV',
    host: '',
    port: 0,
    path: '',
    needsAuth: false,
    pageLimit : 10
  })

  .config(function($httpProvider) {
    // $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post['Accept'] = 'application/json;charset=euc-kr';
  })

  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('localStorage');
    localStorageServiceProvider.setPrefix('m.elidom.hatio.com');
  })

  /*.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
  })*/

  /**
   * @ngdoc config
   * @name MobileNiceDocu
   * @description 시스템 URL 라우팅
   */
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // 테스트 시스템에서는 캐쉬를 사용하지 않는다.
    // $ionicConfigProvider.views.maxCache(0);

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      })

      .state('app.home', {
        url: '/home',
        params : { from : null, searchParams :null },
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeCtrl'
          }
        }
      })   

      .state('app.notice', {
        url: '/notice',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/notice.html',
            controller: 'NoticeCtrl'
          }
        }
      })

      .state('app.profile', {
        url: '/profile',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })

      .state('app.signin', {
        url: '/signin',
        params : { message : null },
        views: {
          'viewContent': {
            templateUrl: 'templates/views/signin.html',
            controller: 'SigninCtrl'
          }
        }
      })

      .state('app.signout', {
        url: '/signout',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/signout.html',
            controller: 'SignoutCtrl'
          }
        }
      })

      .state('app.preference', {
        url: '/preference',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/preference.html',
            controller: 'PreferenceCtrl'
          }
        }
      });
                  
    $urlRouterProvider.otherwise('/app/home');
  });