'use strict';

/**
 * @ngdoc constant
 * @name plugins.socket.config:SocketConfig
 * @description
 *  Socket Module Configuration
 */
angular.module('Elidom.Socket')
  .config(function($stateProvider, $ionicConfigProvider) {

    // 테스트 시스템에서는 캐쉬를 사용하지 않는다.
    // $ionicConfigProvider.views.maxCache(0);

    $stateProvider

      .state('app.setting-socket', {
        url: '/setting-socket',
        views: {
          'viewContent': {
            templateUrl: 'plugins/socket/templates/views/setting-socket.html',
            controller: 'SettingSocketCtrl'
          }
        }
      });
      
  });