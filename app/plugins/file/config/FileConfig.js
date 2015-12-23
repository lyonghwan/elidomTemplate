'use strict';

/**
 * @ngdoc constant
 * @name plugins.file.config:FileConfig
 * @description
 *  File Module Configuration
 */
angular.module('Elidom.File')
  .config(function($stateProvider, $ionicConfigProvider) {

    // 테스트 시스템에서는 캐쉬를 사용하지 않는다.
    // $ionicConfigProvider.views.maxCache(0);

    $stateProvider

      .state('app.setting-file', {
        url: '/setting-file',
        views: {
          'viewContent': {
            templateUrl: 'plugins/file/templates/views/setting-file.html',
            controller: 'SettingFileCtrl'
          }
        }
      });
      
  });