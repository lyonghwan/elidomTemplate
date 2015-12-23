'use strict';

/**
 * @ngdoc function
 * @name Elidom.Base.controllers:HomeCtrl
 * @description
 * # Gallery Controller
 */
angular.module('Elidom.Base')
    .controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, MenuService, ApiService) {

        MenuService.setSideMenu('main');
        // $scope.$parent.showHeader();
        // $scope.$parent.clearFabs();
        // $scope.isExpanded = true;
        // $scope.$parent.setExpanded(true);
        // $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        // ionicMaterialInk.displayEffect();

        // ionicMaterialMotion.pushDown({
        //     selector: '.push-down'
        // });
        
        // ionicMaterialMotion.fadeSlideInRight({
        //     selector: '.animate-fade-slide-in .item'
        // });
    });