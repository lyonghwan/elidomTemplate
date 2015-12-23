'use strict';

/**
 * @ngdoc constant
 * @name plugins.printer.config:PrinterConfig
 * @description
 *  Printer Module Configuration
 */
angular.module('Elidom.Printer')
  .config(function($stateProvider, $ionicConfigProvider) {

    // 테스트 시스템에서는 캐쉬를 사용하지 않는다.
    // $ionicConfigProvider.views.maxCache(0);

    $stateProvider

      .state('app.print', {
        url: '/print',
        views: {
          'viewContent': {
            templateUrl: 'plugins/printer/templates/views/printer.html',
            controller: 'PrinterCtrl'
          }
        }
      })      

      .state('app.setting-printer', {
        url: '/setting-printer',
        views: {
          'viewContent': {
            templateUrl: 'plugins/printer/templates/views/setting-printer.html',
            controller: 'SettingPrinterCtrl'
          }
        }
      });
      
  });