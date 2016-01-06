'use strict';

/**
 * @ngdoc constant
 * @name Elidom.Base.config
 * @description
 *  모든 화면 라우터와 서버연결 정보를 이 파일에서 정의한다.
 */
angular.module('Elidom.Base')

  /**
   * Dynamic Loading Configuration
   */
  .config(function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({ debug : true, events : true });
  })

  /**
   * @ngdoc config
   * @name Elidom.Base
   * @description 시스템 URL 라우팅
   */
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // 테스트 시스템에서는 캐쉬를 사용하지 않는다.
    // $ionicConfigProvider.views.maxCache(0);

    // Application routing
    $stateProvider

      .state('app.service', {
        url: '/service',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/service.html',
            controller: 'ServiceCtrl'
          }
        }
      })

      .state('app.service-detail', {
        url: '/service-detail',
        params : { id : '' },
        views: {
          'viewContent': {
            templateUrl: 'templates/views/service-detail.html',
            controller: 'ServiceDetailCtrl'
          }
        }
      })

      .state('app.service-api-detail', {
        url: '/service-api-detail',
        params : { id : '' },
        views: {
          'viewContent': {
            templateUrl: 'templates/views/service-api-detail.html',
            controller: 'ServiceApiDetailCtrl'
          }
        }
      })

      .state('app.setting-basic', {
        url: '/setting-basic',
        views: {
          'viewContent': {
            templateUrl: 'templates/views/setting-basic.html',
            controller: 'SettingBasicCtrl'
          }
        }
      });
      
  });