'use strict';

/**
 * @ngdoc function
 * @name ElidomTemplate.controllers:HomeCtrl
 * @description
 * # HomeController
 */
angular.module('ElidomTemplate')
  .controller('HomeCtrl', function($scope, MenuService, ApiService, ionicMaterialInk, ionicMaterialMotion) {

    MenuService.setSideMenu('main');

    /*$scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);*/

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

  });